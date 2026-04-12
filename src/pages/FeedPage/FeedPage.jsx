import React, { useState, useRef } from 'react';
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
import { RiSearchEyeLine } from "react-icons/ri"      // Enquiry
import { FaRegComment } from "react-icons/fa"          // Comment
import { IoIosShareAlt } from "react-icons/io";
import SharePostDialog from '../../components/SharePostDialog';
const feedData = [
    {
        id: 1,
        type: 'image',
        username: 'Chennai_Creator',
        location: 'A Branded Tea Shop',
        avatar: '/src/assets/homelander1.jpg',
        images: [
            '/src/assets/pexel.jpg',
            '/src/assets/swiz3.jpg',
            '/src/assets/uk1.jpg',
        ],
        captionUser: 'chennai_curator',
        caption: 'Finding the perfect brew in the heart of Besant Nagar. This new spot has the best aesthetic for morning curators.',
        time: '2 Hours Ago',
        comments: 0,
    },
    {
        id: 2,
        type: 'video',
        username: 'Marina_Eats',
        location: 'Seafood Corner, ECR',
        avatar: '/src/assets/hero.png',
        video: '/src/assets/background2.mp4',
        captionUser: 'marina_foodie',
        caption: 'Fresh catch of the day at this hidden gem on ECR. The prawn fry is absolutely unreal!',
        time: '5 Hours Ago',
        comments: 3,
    },
    {
        id: 3,
        type: 'image',
        username: 'T_Nagar_Trends',
        location: 'Fashion Street, T.Nagar',
        avatar: '/src/assets/homelander.jpg',
        images: [
            '/src/assets/uk1.jpg',
            '/src/assets/homelander1.jpg',
            '/src/assets/pexel.jpg',
            '/src/assets/swiz3.jpg',
        ],
        captionUser: 't_nagar_style',
        caption: 'New collection just dropped at the most iconic shopping street in Chennai. Must visit this weekend!',
        time: '1 Day Ago',
        comments: 12,
    },
    {
        id: 4,
        type: 'text',
        username: 'Marina_Eats',
        location: 'Seafood Corner, ECR',
        avatar: '/src/assets/hero.png',
        title: 'The Architecture of Silence',
        captionUser: 'marina_foodie',
        caption: 'Fresh catch of the day at this hidden gem on ECR.Fresh catch of the day at this hidden gem on ECR Fresh catch of the day at this hidden gem on ECR.Fresh catch of the day at this hidden gem on ECR Fresh catch of the day at this hidden gem on ECR.Fresh catch of the day at this hidden gem on ECR Fresh catch of the day at this hidden gem on ECR.Fresh catch of the day at this hidden gem on ECR Fresh catch of the day at this hidden gem on ECR.Fresh catch of the day at this hidden gem on ECR',
        time: '5 Hours Ago',
        comments: 3,
    }

];

const FeedItem = ({ post }) => {
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

    const words = post.caption.split(' ');
    const maxWords = 8 * 6;
    const isLong = words.length > maxWords;
    const shortCaption = words.slice(0, maxWords).join(' ');

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
                <UserAvatar src={post.avatar} alt={post.username} />
                <UserInfo>
                    <UserName>{post.username}</UserName>
                    <UserLocation>{post.location}</UserLocation>
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
                <EnquiryButton>Enquiry Now</EnquiryButton>
                <PostFooter>
                    <ActionBar>
                        <EnquiryBadge>
                            <RiSearchEyeLine size={16} color="#444" />
                            <EnquiryText>5</EnquiryText>
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
    return (
        <FeedPageWrapper>
            <FeedContainer>
                {feedData.map((post) => (
                    <FeedItem key={post.id} post={post} />
                ))}
            </FeedContainer>
        </FeedPageWrapper>
    );
};

export default FeedPage;