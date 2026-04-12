// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//     DetailWrapper,
//     HeroImage,
//     BackButton,
//     OverlayContent,
//     UserRow,
//     DetailAvatar,
//     DetailUserInfo,
//     DetailUserName,
//     DetailUserLocation,
//     DetailCaption,
//     DetailTime,
//     DetailEnquiryButton,
//     PostMedia,
//     SliderTrack,
//     SliderImage,
//     CarouselDots,
//     Dot,
//     TextContentTitle,
//     PostFooter,
//     ActionBar,
//     EnquiryBadge,
//     EnquiryText,
//     IconButton,
//     CountText,
// } from '../../css/index';
// import { IoArrowBack } from 'react-icons/io5';
// import { useState, useRef } from 'react';
// import { RiSearchEyeLine } from "react-icons/ri"
// import { IoIosShareAlt } from "react-icons/io";
// const FeedDetail = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const post = location.state?.post;
//     const [activeSlide, setActiveSlide] = useState(0);
//     const touchStartX = useRef(null);
//     const touchEndX = useRef(null);

//     if (!post) {
//         navigate('/home');
//         return null;
//     }
//     const handleTouchStart = (e) => {
//         touchStartX.current = e.touches[0].clientX;
//     };

//     const handleTouchMove = (e) => {
//         touchEndX.current = e.touches[0].clientX;
//     };

//     const handleTouchEnd = () => {
//         if (!touchStartX.current || !touchEndX.current) return;

//         const diff = touchStartX.current - touchEndX.current;

//         if (diff > 50 && activeSlide < post.images.length - 1) {
//             setActiveSlide((prev) => prev + 1);
//         } else if (diff < -50 && activeSlide > 0) {
//             setActiveSlide((prev) => prev - 1);
//         }

//         touchStartX.current = null;
//         touchEndX.current = null;
//     };


//     return (
//         <DetailWrapper>
//             {post.type === 'image' && post.images?.length > 0 && (
//                 <PostMedia
//                     onTouchStart={handleTouchStart}
//                     onTouchMove={handleTouchMove}
//                     onTouchEnd={handleTouchEnd}
//                 >
//                     <SliderTrack activeSlide={activeSlide}>
//                         {post.images.map((img, i) => (
//                             <SliderImage key={i} src={img} alt={`slide-${i}`} />
//                         ))}
//                     </SliderTrack>

//                     <CarouselDots>
//                         {post.images.map((_, i) => (
//                             <Dot
//                                 key={i}
//                                 active={i === activeSlide}
//                                 onClick={() => setActiveSlide(i)}
//                             />
//                         ))}
//                     </CarouselDots>

//                     <OverlayContent>
//                         <UserRow>
//                             <DetailAvatar src={post.avatar} alt={post.username} />
//                             <DetailUserInfo>
//                                 <DetailUserName>{post.username}</DetailUserName>
//                                 <DetailUserLocation>{post.location}</DetailUserLocation>
//                             </DetailUserInfo>
//                         </UserRow>

//                         {post.title && <TextContentTitle>{post.title}</TextContentTitle>}
//                         <DetailCaption>{post.caption}</DetailCaption>
//                         <DetailTime>{post.time}</DetailTime>

//                         <DetailEnquiryButton>Enquiry Now</DetailEnquiryButton>

//                         <PostFooter>
//                             <ActionBar>
//                                 <EnquiryBadge>
//                                     <RiSearchEyeLine size={16} color="#fff" />
//                                     <EnquiryText style={{ color: '#fff' }}>5 People clicked Enquiry</EnquiryText>
//                                 </EnquiryBadge>

//                                 <IconButton>
//                                     <IoIosShareAlt size={20} color="#fff" />
//                                     <CountText style={{ color: '#fff' }}>Share</CountText>
//                                 </IconButton>
//                             </ActionBar>
//                         </PostFooter>
//                     </OverlayContent>
//                 </PostMedia>
//             )}

//             <BackButton onClick={() => navigate(-1)}>
//                 <IoArrowBack size={20} color="#ffffff" />
//             </BackButton>
//         </DetailWrapper>
//     );
// };

// export default FeedDetail;

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    DetailWrapper, HeroImage, BackButton, OverlayContent, UserRow,
    DetailAvatar, DetailUserInfo, DetailUserName, DetailUserLocation,
    DetailCaption, DetailTime, DetailEnquiryButton,
    PostMedia, SliderTrack, SliderImage, CarouselDots, Dot,
    TextContentTitle, TextContentBody,
    DetailFooter, ActionBar, EnquiryBadge, EnquiryText, IconButton, CountText,
    LastSlideBar, LastSlideButton, LastSlideLabel, LastSlideIcon,
    VideoWrapper, PostVideo,
} from '../../css/index';
import { IoArrowBack } from 'react-icons/io5';
import { useState, useRef } from 'react';
import { RiSearchEyeLine } from "react-icons/ri";
import { IoIosShareAlt } from "react-icons/io";

const FooterBar = () => (
    <DetailFooter>
        <ActionBar>
            <EnquiryBadge>
                <RiSearchEyeLine size={16} color="currentColor" />
                <EnquiryText>5</EnquiryText>
            </EnquiryBadge>
            <IconButton>
                <IoIosShareAlt size={20} color="currentColor" />
                <CountText>Share</CountText>
            </IconButton>
        </ActionBar>
    </DetailFooter>
);

const FeedDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const post = location.state?.post;
    const [activeSlide, setActiveSlide] = useState(0);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    if (!post) { navigate('/home'); return null; }

    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const diff = touchStartX.current - touchEndX.current;
        if (diff > 50 && activeSlide < post.images.length - 1) setActiveSlide(p => p + 1);
        else if (diff < -50 && activeSlide > 0) setActiveSlide(p => p - 1);
        touchStartX.current = null;
        touchEndX.current = null;
    };

    const isLastImage = post.type === 'image' && activeSlide === post.images?.length - 1;

    const handleLastImageEnquiry = () => {
        // Replace this with your actual enquiry callback logic
        console.log('Enquiry clicked on last image slide', { postId: post.id, activeSlide });
    };

    // --- IMAGE ---
    if (post.type === 'image') {
        return (
            <DetailWrapper>
                <BackButton onClick={() => navigate(-1)}>
                    <IoArrowBack size={20} color="#ffffff" />
                </BackButton>
                <PostMedia
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <SliderTrack activeSlide={activeSlide}>
                        {post.images.map((img, i) => (
                            <SliderImage key={i} src={img} alt={`slide-${i}`} />
                        ))}
                    </SliderTrack>
                    <CarouselDots>
                        {post.images.map((_, i) => (
                            <Dot key={i} active={i === activeSlide} onClick={() => setActiveSlide(i)} />
                        ))}
                    </CarouselDots>
                </PostMedia>
                <OverlayContent style={{ paddingBottom: isLastImage ? '110px' : undefined }}>
                    <UserRow>
                        <DetailAvatar src={post.avatar} alt={post.username} />
                        <DetailUserInfo>
                            <DetailUserName>{post.username}</DetailUserName>
                            <DetailUserLocation>{post.location}</DetailUserLocation>
                        </DetailUserInfo>
                    </UserRow>
                    {post.title && <TextContentTitle>{post.title}</TextContentTitle>}
                    <DetailCaption>{post.caption}</DetailCaption>
                    <DetailTime>{post.time}</DetailTime>
                    <DetailEnquiryButton>Enquiry Now</DetailEnquiryButton>
                    <FooterBar />
                </OverlayContent>
                {isLastImage && (
                    <LastSlideBar>
                        <LastSlideButton onClick={handleLastImageEnquiry}>
                            <LastSlideLabel>Enquiry Now</LastSlideLabel>
                            <LastSlideIcon>›</LastSlideIcon>
                        </LastSlideButton>
                    </LastSlideBar>
                )}
            </DetailWrapper>
        );
    }

    // --- VIDEO ---
    if (post.type === 'video') {
        return (
            <DetailWrapper>
                <BackButton onClick={() => navigate(-1)}>
                    <IoArrowBack size={20} color="#ffffff" />
                </BackButton>
                <VideoWrapper>
                    <PostVideo autoPlay muted loop playsInline controls>
                        <source src={post.video} type="video/mp4" />
                    </PostVideo>
                </VideoWrapper>
                <OverlayContent>
                    <UserRow>
                        <DetailAvatar src={post.avatar} alt={post.username} />
                        <DetailUserInfo>
                            <DetailUserName>{post.username}</DetailUserName>
                            <DetailUserLocation>{post.location}</DetailUserLocation>
                        </DetailUserInfo>
                    </UserRow>
                    <DetailCaption>{post.caption}</DetailCaption>
                    <DetailTime>{post.time}</DetailTime>
                    <DetailEnquiryButton>Enquiry Now</DetailEnquiryButton>
                    <FooterBar />
                </OverlayContent>
            </DetailWrapper>
        );
    }

    // --- TEXT ---
    if (post.type === 'text') {
        return (
            <DetailWrapper>
                <BackButton onClick={() => navigate(-1)}>
                    <IoArrowBack size={20} color="currentColor" />
                </BackButton>
                <OverlayContent>
                    <UserRow>
                        <DetailAvatar src={post.avatar} alt={post.username} />
                        <DetailUserInfo>
                            <DetailUserName>{post.username}</DetailUserName>
                            <DetailUserLocation>{post.location}</DetailUserLocation>
                        </DetailUserInfo>
                    </UserRow>
                    {post.title && <TextContentTitle>{post.title}</TextContentTitle>}
                    <TextContentBody>{post.caption}</TextContentBody>
                    <DetailTime>{post.time}</DetailTime>
                    <DetailEnquiryButton>Enquiry Now</DetailEnquiryButton>
                    <FooterBar />
                </OverlayContent>
            </DetailWrapper>
        );
    }
    return null;
};

export default FeedDetail;