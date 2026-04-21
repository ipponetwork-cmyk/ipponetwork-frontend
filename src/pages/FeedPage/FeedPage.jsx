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
import { getDynamicText } from '../../utils/languageUtils';
import Loader from '../../components/Loader';
import { getDomainName } from '../../utils/domainUtils';

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

const transformPost = (apiPost) => {
    console.log(apiPost, "API POST TRANSFORM")
    const attachments = apiPost.attachment || [];
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.m4v'];
    const videoFile = attachments.find(url =>
        videoExtensions.some(ext => url.toLowerCase().endsWith(ext))
    );
    const imageFiles = attachments.filter(url =>
        !videoExtensions.some(ext => url.toLowerCase().endsWith(ext)) &&
        !url.toLowerCase().endsWith('.pdf')
    );

    let type = 'text';
    if (videoFile) {
        type = 'video';
    } else if (imageFiles.length > 0) {
        type = 'image';
    }

    return {
        id: apiPost._id,
        _id: apiPost._id,
        type,
        username: apiPost.createdusername || 'User',
        location: apiPost.listofdomain?.[0] || 'Location',
        attachment: apiPost.attachment,
        images: imageFiles,
        video: videoFile,
        titleObj: apiPost.title,
        captionObj: apiPost.description,
        titleEn: getLangString(apiPost.title?.en, 'Post Title'),
        titleTa: getLangString(apiPost.title?.ta, 'Post Title'),
        captionUser: apiPost.createdusername || 'user',
        captionEn: getLangString(apiPost.description?.en, ''),
        captionTa: getLangString(apiPost.description?.ta, ''),
        time: new Date(apiPost.createdtimestamp).toLocaleDateString(),
        enquirycount: apiPost.enquirycount || 0,
        // Call-to-action details
        calltoaction: apiPost.calltoaction,
        calltoactiontype: apiPost.calltoactiontype,
        whatsappnumber: apiPost.whatsappnumber,
        whatsappmessage: apiPost.whatsappmessage,
        callnumber: apiPost.callnumber,
        calltoactionexternallinkurl: apiPost.calltoactionexternallinkurl,
        createduserid: apiPost.createduserid,
    };
};

const FeedItem = ({ post, onEnquiryUpdate, dynamicLanguage }) => {
    console.log(post, "post in feed item")
    const [activeSlide, setActiveSlide] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [color, setColor] = useState(
        () => localStorage.getItem('themeName')
    );
    console.log(color, "colo123r")
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
    useEffect(() => {
        const handleTheme = () => {
            const themeChange = localStorage.getItem('themeName');
            const themeColor = themeChange === 'theme2' ? 'white' : 'black';  // ← fixed colors
            setColor(themeColor);
        };

        handleTheme();  // run on mount

        window.addEventListener('storage', handleTheme);
        const interval = setInterval(handleTheme, 300);  // catch same-tab changes

        return () => {
            window.removeEventListener('storage', handleTheme);
            clearInterval(interval);
        };
    }, []);

    const captionText = getDynamicText(post.captionObj, dynamicLanguage, post.captionEn || '');
    const titleText = getDynamicText(post.titleObj, dynamicLanguage, post.titleEn || 'Post Title');
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
                                <span>Enquiry</span>
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
                <EnquiryButton onClick={handleEnquiryClick}>Enquiry</EnquiryButton>

                <PostFooter>
                    <ActionBar>
                        <EnquiryBadge>
                            <GrSearchAdvanced size={16} />
                            {/* <SearchIcon size="20px" /> */}
                            {/* <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill={color === "theme1" ? "#ffffff" : "#000000"} d="M13.9148 13.5018L11.9123 11.4992L13.7433 9.66817C13.9557 9.45642 14.0443 9.15425 13.9796 8.85908C13.9143 8.56508 13.706 8.32883 13.4243 8.22675L8.19292 6.32392C7.6545 6.12558 7.06883 6.25683 6.664 6.66225C6.25917 7.06708 6.1285 7.65333 6.3245 8.19117L8.22792 13.4225C8.33 13.7048 8.56625 13.9131 8.862 13.9784C8.92383 13.9918 8.98742 13.9988 9.04983 13.9988C9.28317 13.9988 9.50308 13.9078 9.66875 13.7427L11.5004 11.9111L13.503 13.9137C13.5602 13.9708 13.6348 13.9988 13.7095 13.9988C13.7842 13.9988 13.8588 13.9702 13.916 13.9137C14.0298 13.7999 14.0298 13.615 13.916 13.5013L13.9148 13.5018ZM9.25633 13.3309C9.18575 13.4015 9.08192 13.4312 8.98683 13.4097C8.88883 13.3881 8.81008 13.3192 8.77625 13.2247L6.87283 7.99283C6.75558 7.67025 6.83375 7.31908 7.077 7.07583C7.245 6.90783 7.46433 6.81917 7.69008 6.81917C7.79158 6.81917 7.89425 6.83667 7.994 6.87342L13.2265 8.77625C13.3204 8.81067 13.3893 8.88883 13.4108 8.98625C13.4324 9.08483 13.4033 9.18575 13.3327 9.25575L9.2575 13.3309H9.25633ZM6.41667 11.3517C6.42542 11.5121 6.30175 11.6497 6.14075 11.6579C6.03867 11.6637 5.93658 11.6661 5.83392 11.6661C2.61683 11.6667 0 9.04983 0 5.83333C0 2.61683 2.61683 0 5.83333 0C9.04983 0 11.6667 2.61683 11.6667 5.83333C11.6667 5.93658 11.6643 6.03867 11.6585 6.14017C11.6503 6.30058 11.5162 6.43183 11.3523 6.41608C11.1918 6.40733 11.0682 6.27025 11.0763 6.10983C11.081 6.01825 11.0833 5.92667 11.0833 5.83333C11.0833 2.93825 8.72842 0.583333 5.83333 0.583333C2.93825 0.583333 0.583333 2.93825 0.583333 5.83333C0.583333 8.72842 2.93825 11.0833 5.83333 11.0833C5.92608 11.0833 6.01767 11.081 6.10983 11.0763C6.27142 11.0588 6.4085 11.1912 6.41608 11.3523L6.41667 11.3517ZM2.91667 5.83333C2.91667 7.2415 3.92 8.44783 5.3025 8.70158C5.46117 8.73075 5.56617 8.883 5.537 9.04108C5.51075 9.18167 5.38825 9.28025 5.25058 9.28025C5.23308 9.28025 5.215 9.2785 5.1975 9.27558C3.53733 8.97108 2.33333 7.52325 2.33333 5.83333C2.33333 3.90308 3.90308 2.33333 5.83333 2.33333C7.52325 2.33333 8.97108 3.53733 9.27558 5.1975C9.30475 5.35558 9.19975 5.50783 9.04108 5.537C8.88475 5.56267 8.73133 5.46117 8.70158 5.3025C8.44783 3.92 7.2415 2.91667 5.83333 2.91667C4.22508 2.91667 2.91667 4.22508 2.91667 5.83333Z" />
                            </svg> */}

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
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(posts, "postPage1232")
    const [dynamicLanguage, setDynamicLanguage] = useState(() => localStorage.getItem('language') || 'en');
    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true);

            const domain = getDomainName();
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
                    <div style={{ textAlign: 'center' }}><Loader /></div>
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