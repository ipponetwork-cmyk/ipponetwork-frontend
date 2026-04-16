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
    CountText
} from '../../css/index';
import { IoIosArrowForward } from "react-icons/io";
import { RiSearchEyeLine } from "react-icons/ri"      // Enquiry
import { FaRegComment } from "react-icons/fa"          // Comment
import { IoIosShareAlt } from "react-icons/io";
import SharePostDialog from '../../components/SharePostDialog';
import { postAPI } from '../../services/postAPI';

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
        attachment:apiPost.attachment,
        images: apiPost.attachment || [],
        video: null,
        title: getLangString(apiPost.title, 'Post Title'),
        captionUser: apiPost.createdusername || 'user',
        caption: getLangString(apiPost.description, ''),
        time: new Date(apiPost.createdtimestamp).toLocaleDateString(),
        enquirycount: apiPost.enquirycount || 0,
        // Call-to-action details
        calltoaction: apiPost.calltoaction,
        calltoactiontype: apiPost.calltoactiontype,
        whatsappnumber: apiPost.whatsappnumber,
        whatsappmessage: apiPost.whatsappmessage,
        callnumber: apiPost.callnumber,
        calltoactionexternallinkurl: apiPost.calltoactionexternallinkurl,
        createduserid:apiPost.createduserid
    };
};

const FeedItem = ({ post, onEnquiryUpdate }) => {
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

const handleEnquiryClick = async () => {
    try {
        await postAPI.increaseEnquiryCount(post._id);
        // Refetch posts to update enquiry count
        if (onEnquiryUpdate) {
            onEnquiryUpdate();
        }
        const actionType = post.calltoaction?.type || '';

        console.log('actionType:', actionType);
        console.log('post:', post);

        if (actionType === 'whatsapp' && post.whatsappnumber) {
            const message = post.whatsappmessage || 'Hi, I am interested in your post';
            window.open(`https://wa.me/${post.whatsappnumber}?text=${encodeURIComponent(message)}`, '_blank');

        } else if (actionType === 'call' && post.callnumber) {
            window.location.href = `tel:${post.callnumber}`;

        } else if (actionType === 'externallink' && post.calltoaction?.externallinkurl) {
            window.open(post.calltoaction.externallinkurl, '_blank');

        } else {
            alert('Action not configured for this post');
        }

    } catch (err) {
        console.error('Enquiry error:', err);
    }
};

    const safeCaption = typeof post.caption === 'string' ? post.caption : String(post.caption || '');
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
                    <TextContentTitle>{post.title}</TextContentTitle>

                    <TextContentBody>
                        {expanded || !isLong ? post.caption : `${shortCaption}...`}
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
                <UserAvatar src={post.attachment} alt={post.attachment} />
                <UserInfo>
                    <UserName>{post.createduserid ? post.createduserid?.name : post.username}</UserName>
                    <UserLocation>{post.createduserid ? post.createduserid?.username : post.username}</UserLocation>
                </UserInfo>
                {/* <MoreOptions /> */}
            </PostHeader>

            {renderMedia()}

            <PostContent>
                <PostCaption>
                    {post.type !== 'text' && <CaptionUser>{post.captionUser} </CaptionUser>}
                    {post.type !== 'text' && <CaptionText>{post.caption}</CaptionText>}
                </PostCaption>
                <PostTime>{post.time}</PostTime>
                <EnquiryButton onClick={handleEnquiryClick}>Enquiry Now</EnquiryButton>

                <PostFooter>
                    <ActionBar>
                        <EnquiryBadge>
                            <RiSearchEyeLine size={16} color="#444" />
                            <EnquiryText>{post.enquirycount}</EnquiryText>
                        </EnquiryBadge>

                        <IconButton onClick={() => setShareDialogOpen(true)}>
                            <IoIosShareAlt size={20} color="#444" />
                            <CountText>Share</CountText>
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

    // const fetchPosts = async () => {
    //     try {
    //         setLoading(true);

    //         const rawDomain = window.location.hostname;
    //         console.log(rawDomain, "raw domain")
    //         const domain = rawDomain === 'localhost' ? 'ippomadurai' : rawDomain.split('.')[0];

    //         const response = await postAPI.getPostsByDomain(domain);
    //         console.log(response, "response9090")
    //         if (response.success && response.data) {
    //             const transformedPosts = response.data.map(transformPost);
    //             console.log(transformedPosts, "transformed posts")
    //             setPosts(transformedPosts);
    //         } else {
    //             setError(response.message || 'Failed to fetch posts');
    //         }
    //     } catch (err) {
    //         setError(err.message || 'Error fetching posts');
    //         console.error('Error fetching posts:', err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
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

    return (
        <FeedPageWrapper>
            <FeedContainer>
                {loading ? (
                    <div style={{ padding: '20px', textAlign: 'center' }}>Loading posts...</div>
                ) : error ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Error: {error}</div>
                ) : posts.length > 0 ? (
                    posts.map((post) => (
                        <FeedItem key={post._id} post={post} onEnquiryUpdate={fetchPosts} />
                    ))
                ) : (
                    <div style={{ padding: '20px', textAlign: 'center' }}>No posts available</div>
                )}
            </FeedContainer>
        </FeedPageWrapper>
    );
};

export default FeedPage;