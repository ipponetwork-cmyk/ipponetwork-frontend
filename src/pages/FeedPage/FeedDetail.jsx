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
    DetailSlideActionButton,
    VideoWrapper, PostVideo,
} from '../../css/index';
import { IoArrowBack } from 'react-icons/io5';
import { useState, useRef } from 'react';
import { RiSearchEyeLine } from "react-icons/ri";
import { IoIosArrowForward, IoIosShareAlt } from "react-icons/io";
import { postAPI } from '../../services/postAPI';
import SharePostDialog from '../../components/SharePostDialog';

const FooterBar = ({ enquirycount, onShare }) => (
    <DetailFooter>
        <ActionBar>
            <EnquiryBadge>
                <RiSearchEyeLine size={16} color="currentColor" />
                <EnquiryText>{enquirycount}</EnquiryText>
            </EnquiryBadge>
            <IconButton onClick={onShare}>
                <IoIosShareAlt size={20} color="currentColor" />
                {/* <CountText>Share</CountText> */}
            </IconButton>
        </ActionBar>
    </DetailFooter>
);

const FeedDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const post = location.state?.post;
    console.log(post, "POST7834")
    const [activeSlide, setActiveSlide] = useState(0);
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [enquiryCount, setEnquiryCount] = useState(post?.enquirycount || 0);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    if (!post) { navigate('/home'); return null; }

    const handleEnquiryClick = async () => {
        try {
            await postAPI.increaseEnquiryCount(post._id);
            setEnquiryCount(prev => prev + 1);
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

    const handleShare = () => {
        setShareDialogOpen(true);
    };

    // --- IMAGE ---
    if (post.type === 'image') {
        return (
            <>
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
                            <DetailAvatar src={post.attachment} alt={post.attachment} />
                            <DetailUserInfo>
                                <DetailUserName>{post.createduserid ? post.createduserid?.name : post.username}</DetailUserName>
                                <DetailUserLocation>{post.createduserid ? post.createduserid?.username : post.username}</DetailUserLocation>
                            </DetailUserInfo>
                        </UserRow>
                        {/* {post.title && <TextContentTitle>{post.title}</TextContentTitle>} */}
                        <DetailCaption>{post.caption}</DetailCaption>
                        <DetailTime>{post.time}</DetailTime>
                        <DetailEnquiryButton onClick={handleEnquiryClick}>Enquiry Now</DetailEnquiryButton>
                        <FooterBar enquirycount={enquiryCount} onShare={handleShare} />
                    </OverlayContent>
                    {isLastImage && (
                        <DetailSlideActionButton onClick={handleEnquiryClick}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4px" }}>
                                <span>Enquiry Now</span>
                                <IoIosArrowForward size={18} />
                            </div>                    </DetailSlideActionButton>
                    )}
                </DetailWrapper>
                <SharePostDialog
                    open={shareDialogOpen}
                    onClose={() => setShareDialogOpen(false)}
                    postId={post.id}
                />
            </>
        );
    }

    // --- VIDEO ---
    if (post.type === 'video') {
        return (
            <>
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
                            <DetailAvatar src={post.attachment} alt={post.attachment} />
                            <DetailUserInfo>
                                <DetailUserName>{post.createduserid ? post.createduserid?.name : post.username}</DetailUserName>
                                <DetailUserLocation>{post.createduserid ? post.createduserid?.username : post.username}</DetailUserLocation>
                            </DetailUserInfo>
                        </UserRow>
                        <DetailCaption>{post.caption}</DetailCaption>
                        <DetailTime>{post.time}</DetailTime>
                        <DetailEnquiryButton onClick={handleEnquiryClick}>Enquiry Now</DetailEnquiryButton>
                        <FooterBar enquirycount={enquiryCount} onShare={handleShare} />
                    </OverlayContent>
                </DetailWrapper>
                <SharePostDialog
                    open={shareDialogOpen}
                    onClose={() => setShareDialogOpen(false)}
                    postId={post.id}
                />
            </>
        );
    }

    // --- TEXT ---
    if (post.type === 'text') {
        return (
            <>
                <DetailWrapper>
                    <BackButton onClick={() => navigate(-1)}>
                        <IoArrowBack size={20} color="currentColor" />
                    </BackButton>
                    <OverlayContent>
                        {/* <UserRow>
                            <DetailAvatar src={post.avatar} alt={post.username} />
                            <DetailUserInfo>
                                <DetailUserName>{post.username}</DetailUserName>
                                <DetailUserLocation>{post.location}</DetailUserLocation>
                            </DetailUserInfo>
                        </UserRow> */}
                        {/* {post.title && <TextContentTitle>{post.title}</TextContentTitle>} */}
                        <TextContentBody>{post.caption}</TextContentBody>
                        <DetailTime>{post.time}</DetailTime>
                        <DetailEnquiryButton onClick={handleEnquiryClick}>Enquiry Now</DetailEnquiryButton>
                        <FooterBar enquirycount={enquiryCount} onShare={handleShare} />
                    </OverlayContent>
                </DetailWrapper>
                <SharePostDialog
                    open={shareDialogOpen}
                    onClose={() => setShareDialogOpen(false)}
                    postId={post.id}
                />
            </>
        );
    }
    return null;
};

export default FeedDetail;