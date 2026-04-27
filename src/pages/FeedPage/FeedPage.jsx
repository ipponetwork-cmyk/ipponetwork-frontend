import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FeedPageWrapper,
    FeedContainer,
    FeedPost,
    PostHeader,
    UserAvatar,
    UserInfo,
    UserName,
    UserLocation,
    MoreOptions,
    PostMedia,
    SliderTrack,
    SliderImage,
    CarouselDots,
    Dot,
    PostContent,
    PostCaption,
    CaptionUser,
    CaptionText,
    PostTime,
    EnquiryButton,
    SlideActionButton,
    PostFooter,
    CommentsSection,
    CommentIcon,
    CommentsCount, TextContentBox, TextContentTitle, ReadMoreButton, TextContentBody, VideoWrapper, PostVideo,
    ActionBar,
    EnquiryBadge,
    EnquiryText,
    IconButton,
    CountText,
    UserAvatarFallback
} from '../../css/index';
import { IoIosArrowForward } from "react-icons/io";
import { RiSearchEyeLine } from "react-icons/ri"      // Enquiry
import { FaRegComment } from "react-icons/fa"          // Comment
import { IoIosShareAlt } from "react-icons/io";
import SharePostDialog from '../../components/SharePostDialog';
import { postAPI } from '../../services/postAPI';
import { FaUser } from "react-icons/fa";    
import { InteractiveIcon  } from '../../components/InteractiveIcon'
import { getDynamicText } from '../../utils/languageUtils';
import Loader from '../../components/Loader';
import { getDomainName } from '../../utils/domainUtils';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../redux/actions';
import { transformPost } from '../../utils/transformPost';


const FeedItem = ({ post, onEnquiryUpdate, dynamicLanguage }) => {
    const currentUser = useSelector((state) => state.profileDetails);
    console.log(currentUser, "currentUser12321")
    console.log(post, "post in feed item")
    const dispatch = useDispatch();
    const [activeSlide, setActiveSlide] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const navigate = useNavigate();
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };

    const videoRef = useRef(null);

    useEffect(() => {
        if (post.type !== 'video' || !videoRef.current) return;

        const currentVideo = videoRef.current;
        const options = {
            root: null,
            threshold: 0.6,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    post.onVisibilityChange(post._id, true);
                } else {
                    post.onVisibilityChange(post._id, false);
                }
            });
        }, options);

        observer.observe(currentVideo);

        return () => {
            if (currentVideo) {
                observer.unobserve(currentVideo);
            }
        };
    }, [post.type, post._id, post.onVisibilityChange, post]);

    useEffect(() => {
        if (!videoRef.current) return;
        
        // Only play if post is active AND video slide is active
        // (Video is always at index 0 in the current implementation)
        if (post.isActive && activeSlide === 0) {
            videoRef.current.play().catch((err) => console.log('Auto-play blocked:', err));
        } else {
            videoRef.current.pause();
        }
    }, [post.isActive, activeSlide]);

    const handleTouchEnd = (mediaCount) => {
        if (!touchStartX.current || !touchEndX.current) return;
        const diff = touchStartX.current - touchEndX.current;
        if (diff > 50 && activeSlide < mediaCount - 1) setActiveSlide((p) => p + 1);
        else if (diff < -50 && activeSlide > 0) setActiveSlide((p) => p - 1);
        touchStartX.current = null;
        touchEndX.current = null;
    };

    const captionText = getDynamicText(post.captionObj, dynamicLanguage, post.captionEn || '');
    const titleText = getDynamicText(post.titleObj, dynamicLanguage, post.titleEn || 'Post Title');
    const handleEnquiryClick = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            dispatch(showToast('Login to continue', 'info'));
            setTimeout(() => navigate('/login'), 1500);
            return;
        }
        try {
            await postAPI.increaseEnquiryCount(post._id);
            if (onEnquiryUpdate) {
                onEnquiryUpdate();
            }

            // Safely extract action type, lowering case and removing spaces
            let rawActionType = typeof post.calltoaction === 'string'
                ? post.calltoaction
                : (post.calltoaction?.type || post.calltoactiontype || '');
            let actionType = String(rawActionType).toLowerCase().replace(/[^a-z]/g, '');

            // Safely extract target values, trying both root and nested object
            const waNumber = post.whatsappnumber || post.calltoaction?.whatsappnumber || post.calltoaction?.number || post.number;
            const waMessage = post.whatsappmessage || post.calltoaction?.whatsappmessage || post.calltoaction?.message || 'Hi, I am interested in your post';
            const cNumber = post.callnumber || post.calltoaction?.callnumber || post.calltoaction?.number || post.number;
            const extLink = post.calltoaction?.externallinkurl || post.calltoactionexternallinkurl || post.externallinkurl || post.calltoaction?.url;

            // If actionType wasn't explicitly provided but we have the data, try to infer it
            if (!actionType) {
                if (waNumber) actionType = 'whatsapp';
                else if (cNumber) actionType = 'call';
                else if (extLink) actionType = 'externallink';
            }

            console.log('Processed actionType:', actionType);
            console.log('Post details:', { waNumber, cNumber, extLink });

            if (actionType.includes('whatsapp') && waNumber) {
                window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`, '_blank');
            } else if (actionType.includes('call') && cNumber) {
                window.location.href = `tel:${cNumber}`;
            } else if (actionType.includes('external') && extLink) {
                let finalUrl = extLink;
                if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
                    finalUrl = 'https://' + finalUrl;
                }
                window.open(finalUrl, '_blank');
            } else {
                alert('Action not configured for this post (Missing data or unknown type: ' + actionType + ')');
            }

        } catch (err) {
            console.error('Enquiry error:', err);
        }
    };

    const safeCaption = typeof captionText === 'string' ? captionText : String(captionText || '');
    const words = safeCaption.split(' ');
    const maxWords = 8 * 6;
    const isLong = words.length > maxWords;
    const shortCaption = words.slice(0, maxWords).join(' ');
    console.log(post, "POSTPOST")
    const renderMedia = () => {
        const mediaList = [];
        if (post.video) mediaList.push({ type: 'video', url: post.video });
        if (post.images && post.images.length > 0) {
            post.images.forEach(img => mediaList.push({ type: 'image', url: img }));
        }

        if (mediaList.length > 0) {
            return (
                <PostMedia
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => handleTouchEnd(mediaList.length)}
                    onClick={() => navigate(`/feed-detail/${post._id}`)}
                    style={{ cursor: 'pointer' }}
                >
                    <SliderTrack activeSlide={activeSlide}>
                        {mediaList.map((item, i) => (
                            item.type === 'video' ? (
                                <VideoWrapper key={i} style={{ minWidth: '100%' }}>
                                    <PostVideo ref={videoRef} loop playsInline controls>
                                        <source src={item.url} type="video/mp4" />
                                    </PostVideo>
                                </VideoWrapper>
                            ) : (
                                <SliderImage key={i} src={item.url} alt={`slide-${i}`} />
                            )
                        ))}
                    </SliderTrack>
                    {mediaList[activeSlide]?.type === 'image' && activeSlide === mediaList.length - 1 && (
                        <SlideActionButton
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEnquiryClick();
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4px" }}>
                                <span>Enquire</span>
                                <IoIosArrowForward size={18} />
                            </div>
                        </SlideActionButton>
                    )}
                    {mediaList.length > 1 && (
                        <CarouselDots>
                            {mediaList.map((_, i) => (
                                <Dot
                                    key={i}
                                    active={i === activeSlide}
                                    onClick={(e) => { e.stopPropagation(); setActiveSlide(i); }}
                                />
                            ))}
                        </CarouselDots>
                    )}
                </PostMedia>
            );
        }

        if (post.type === 'pdf' && post.pdf) {
            return (
                <div
                    onClick={() => window.open(post.pdf, '_blank')}
                    style={{
                        cursor: 'pointer',
                        margin: '10px 0',
                        padding: '16px',
                        background: '#1e1e22',
                        borderRadius: '12px',
                        border: '1px solid #333',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                    }}
                >
                    <MdPictureAsPdf size={48} color="#ff4444" style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                        <p style={{
                            margin: '0 0 4px 0',
                            fontWeight: '600',
                            fontSize: '14px',
                            color: '#f0f0f0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
                            {post.pdf.split('/').pop() || 'Document.pdf'}
                        </p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>
                            Tap to open PDF
                        </p>
                    </div>
                    <IoIosArrowForward size={20} color="#888" style={{ flexShrink: 0 }} />
                </div>
            );
        }

        if (post.type === 'text') {
            return (
                <TextContentBox
                    // onClick={() => navigate('/feed-detail', { state: { postId: post._id } })}
                    onClick={() => navigate(`/feed-detail/${post._id}`)}
                    style={{ cursor: 'pointer' }}
                >
                    <TextContentTitle>{titleText}</TextContentTitle>

                    <TextContentBody>
                        {expanded || !isLong ? captionText : `${shortCaption}...`}
                    </TextContentBody>
                    {isLong && (
                        <ReadMoreButton onClick={(e) => { e.stopPropagation(); setExpanded((p) => !p); }}>
                            {expanded ? 'Read Less' : 'Read More'}
                        </ReadMoreButton>
                    )}
                </TextContentBox>
            );
        }
    };

    return (
        <FeedPost>
            <PostHeader>
                {post?.createduserid?.photo ? (
                    <UserAvatar
                        src={post.createduserid.photo}
                        alt="user"
                    />
                ) : (
                    <UserAvatarFallback>
                        <FaUser />
                    </UserAvatarFallback>
                )}
                <UserInfo>
                    <UserName>{post.createduserid ? post.createduserid?.name : post.username}</UserName>
                    <UserLocation>{post.createduserid ? post.createduserid?.username : post.username}</UserLocation>
                </UserInfo>
                {/* <MoreOptions /> */}
            </PostHeader>

            {renderMedia()}

            <PostContent>
                <PostCaption>
                    {post.type !== 'text' && <CaptionUser>{titleText} </CaptionUser>}
                    {post.type !== 'text' && <CaptionText>{captionText}</CaptionText>}
                </PostCaption>
                <PostTime>{post.time}</PostTime>
                <EnquiryButton onClick={handleEnquiryClick}>Enquire</EnquiryButton>

                <PostFooter>
                    <ActionBar>
                        <EnquiryBadge>
                            <InteractiveIcon size={20} style={{ display: 'block', flexShrink: 0 }} />
                            <EnquiryText>{post.enquirycount}</EnquiryText>
                        </EnquiryBadge>

                        <IconButton onClick={() => setShareDialogOpen(true)}>
                            <IoIosShareAlt size={20} />
                            {/* <CountText>Share</CountText> */}
                        </IconButton>
                    </ActionBar>
                </PostFooter>
            </PostContent>

            <SharePostDialog
                open={shareDialogOpen}
                onClose={() => setShareDialogOpen(false)}
                postId={post.slug || post.id}
            />
        </FeedPost>
    );
};


const FeedPage = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleVideoIds, setVisibleVideoIds] = useState(new Set());

    const handleVisibilityChange = useCallback((id, isVisible) => {
        setVisibleVideoIds(prev => {
            const newSet = new Set(prev);
            if (isVisible) newSet.add(id);
            else newSet.delete(id);
            return newSet;
        });
    }, []);

    // Determine the active video ID (first visible one in the posts array)
    const activeVideoId = posts.find(p => p.type === 'video' && visibleVideoIds.has(p._id))?._id;

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            const user = JSON.parse(userData);
            if (!user.username || !user.name) {
                navigate('/profilepage');
            }
        }
    }, [navigate]);

    console.log(posts, "postPage1232")
    const [dynamicLanguage, setDynamicLanguage] = useState(() => localStorage.getItem('language') || 'en');
    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true);

            let domain = getDomainName();
            if (domain === "localhost") {
                domain = "ippomani.com"
            }
            console.log(domain, "DOMDOMAIN")
            const response = await postAPI.getPostsByDomain(domain);

            if (response.success && response.data) {
                const transformedPosts = response.data.map(transformPost);
                console.log(transformedPosts, "transformedPosts")
                setPosts(transformedPosts);
            } else {
                setError(response.message || 'Failed to fetch posts');
            }
        } catch (err) {
            setError(err.message || 'Error fetching posts');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    useEffect(() => {
        const handleStorage = () => {
            const storedLanguage = localStorage.getItem('language') || 'en';
            if (storedLanguage !== dynamicLanguage) {
                setDynamicLanguage(storedLanguage);
            }
        };

        window.addEventListener('storage', handleStorage);
        const interval = setInterval(handleStorage, 500);

        return () => {
            window.removeEventListener('storage', handleStorage);
            clearInterval(interval);
        };
    }, [dynamicLanguage]);

    return (
        <FeedPageWrapper>
            <FeedContainer>
                {loading ? (
                    <div style={{ textAlign: 'center' }}><Loader /></div>
                ) : error ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Error: {error}</div>
                ) : posts.length > 0 ? (
                    posts.map((post) => (
                        <FeedItem
                            key={post._id}
                            post={{
                                ...post,
                                isActive: post._id === activeVideoId,
                                onVisibilityChange: handleVisibilityChange
                            }}
                            onEnquiryUpdate={fetchPosts}
                            dynamicLanguage={dynamicLanguage}
                        />
                    ))
                ) : (
                    <div style={{ padding: '20px', textAlign: 'center' }}>No posts available</div>
                )}
            </FeedContainer>
        </FeedPageWrapper>
    );
};

export default FeedPage;