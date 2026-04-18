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
import { GrSearchAdvanced } from "react-icons/gr";

const getLangString = (field, defaultStr = '') => {
    if (!field) return defaultStr;
    if (typeof field === 'string') return field;

    if (field.en) {
        const enVal = field.en;
        if (typeof enVal === 'string') return enVal;
        return Object.values(enVal)[0] || defaultStr;
    }
    if (field.ta) {
        const taVal = field.ta;
        if (typeof taVal === 'string') return taVal;
        return Object.values(taVal)[0] || defaultStr;
    }

    const extract = Object.values(field)[0];
    return typeof extract === 'string' ? extract : defaultStr;
};

// Transform API response to FeedItem format
const transformPost = (apiPost) => {
    console.log(apiPost, "API POST TRANSFORM")
    return {
        id: apiPost._id,
        _id: apiPost._id,
        type: apiPost.attachment?.length > 0 ? 'image' : 'text',
        username: apiPost.createdusername || 'User',
        location: apiPost.listofdomain?.[0] || 'Location',
        attachment: apiPost.attachment,
        images: apiPost.attachment || [],
        video: null,
        titleEn: getLangString(apiPost.title.en, 'Post Title'),
        titleTa: getLangString(apiPost.title.ta, 'Post Title'),
        captionUser: apiPost.createdusername || 'user',
        captionEn: getLangString(apiPost.description.en, ''),
        captionTa: getLangString(apiPost.description.ta, ''),
        time: new Date(apiPost.createdtimestamp).toLocaleDateString(),
        enquirycount: apiPost.enquirycount || 0,
        // Call-to-action details
        calltoaction: apiPost.calltoaction,
        calltoactiontype: apiPost.calltoactiontype,
        whatsappnumber: apiPost.whatsappnumber,
        whatsappmessage: apiPost.whatsappmessage,
        callnumber: apiPost.callnumber,
        calltoactionexternallinkurl: apiPost.calltoactionexternallinkurl,
        createduserid: apiPost.createduserid
    };
};

const FeedItem = ({ post, onEnquiryUpdate, dynamicLanguage }) => {
    console.log(post, "post in feed item")
    const [activeSlide, setActiveSlide] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const navigate = useNavigate();
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const diff = touchStartX.current - touchEndX.current;
        if (diff > 50 && activeSlide < post.images?.length - 1) setActiveSlide((p) => p + 1);
        else if (diff < -50 && activeSlide > 0) setActiveSlide((p) => p - 1);
        touchStartX.current = null;
        touchEndX.current = null;
    };
    const captionText = dynamicLanguage === 'ta' ? post.captionTa : post.captionEn;
    const titleText = dynamicLanguage === 'ta' ? post.titleTa : post.titleEn;
    const handleEnquiryClick = async () => {
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
        if (post.type === 'video') {
            return (
                <VideoWrapper>
                    <PostVideo autoPlay muted loop playsInline controls>
                        <source src={post.video} type="video/mp4" />
                    </PostVideo>
                </VideoWrapper>
            );
        }

        if (post.type === 'image' && post.images?.length > 0) {
            return (
                <PostMedia
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onClick={() => navigate('/feed-detail', { state: { post } })}
                    style={{ cursor: 'pointer' }}
                >
                    <SliderTrack activeSlide={activeSlide}>
                        {post.images.map((img, i) => (
                            <SliderImage key={i} src={img} alt={`slide-${i}`} />
                        ))}
                    </SliderTrack>
                    {activeSlide === post.images.length - 1 && (
                        <SlideActionButton
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEnquiryClick();
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4px" }}>
                                <span>Enquiry Now</span>
                                <IoIosArrowForward size={18} />
                            </div>
                        </SlideActionButton>
                    )}
                    <CarouselDots>
                        {post.images.map((_, i) => (
                            <Dot
                                key={i}
                                active={i === activeSlide}
                                onClick={(e) => { e.stopPropagation(); setActiveSlide(i); }}
                            />
                        ))}
                    </CarouselDots>
                </PostMedia>
            );
        }

        if (post.type === 'text') {
            return (
                <TextContentBox
                    onClick={() => navigate('/feed-detail', { state: { post } })}
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
                <EnquiryButton onClick={handleEnquiryClick}>Enquiry Now</EnquiryButton>

                <PostFooter>
                    <ActionBar>
                        <EnquiryBadge>
                            <GrSearchAdvanced size={16} />
                            <EnquiryText>{post.enquirycount}</EnquiryText>
                        </EnquiryBadge>

                        <IconButton onClick={() => setShareDialogOpen(true)}>
                            <IoIosShareAlt size={20} color="#444" />
                            {/* <CountText>Share</CountText> */}
                        </IconButton>
                    </ActionBar>
                </PostFooter>
            </PostContent>

            <SharePostDialog
                open={shareDialogOpen}
                onClose={() => setShareDialogOpen(false)}
                postId={post.id}
            />
        </FeedPost>
    );
};
const FeedPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(posts, "postPage1232")
    const [dynamicLanguage, setDynamicLanguage] = useState(() => localStorage.getItem('language') || 'en');
    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true);

            const rawDomain = window.location.hostname;
            const domain = rawDomain === 'localhost'
                ? 'ippomadurai'
                : rawDomain.split('.')[0];

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
    }, [fetchPosts, dynamicLanguage]);

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
                    <div style={{ padding: '20px', textAlign: 'center' }}>Loading posts...</div>
                ) : error ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Error: {error}</div>
                ) : posts.length > 0 ? (
                    posts.map((post) => (
                        <FeedItem key={post._id} post={post} onEnquiryUpdate={fetchPosts} dynamicLanguage={dynamicLanguage} />
                    ))
                ) : (
                    <div style={{ padding: '20px', textAlign: 'center' }}>No posts available</div>
                )}
            </FeedContainer>
        </FeedPageWrapper>
    );
};

export default FeedPage;