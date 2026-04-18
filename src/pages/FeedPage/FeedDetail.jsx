import React, { useEffect } from 'react';
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
    UserAvatarFallback,
} from '../../css/index';
import { FaUser } from "react-icons/fa";
import { IoArrowBack } from 'react-icons/io5';
import { useState, useRef } from 'react';
import { RiSearchEyeLine } from "react-icons/ri";
import { IoIosArrowForward, IoIosShareAlt } from "react-icons/io";
import { postAPI } from '../../services/postAPI';
import SharePostDialog from '../../components/SharePostDialog';
import { getDynamicText } from '../../utils/languageUtils';

const FooterBar = ({ enquirycount, onShare }) => (
    <DetailFooter>
        <ActionBar>
            <EnquiryBadge>
                <RiSearchEyeLine size={16} />
                <EnquiryText>{enquirycount}</EnquiryText>
            </EnquiryBadge>
            <IconButton onClick={onShare}>
                <IoIosShareAlt size={20} />
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
    const [dynamicLanguage, setDynamicLanguage] = useState(() => localStorage.getItem('language') || 'en');
    const captionText = getDynamicText(post?.captionObj, dynamicLanguage, post?.captionEn || '');
    const titleText = getDynamicText(post?.titleObj, dynamicLanguage, post?.titleEn || 'Post Title');
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
                        {isLastImage && (
                            <DetailSlideActionButton onClick={handleEnquiryClick}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4px" }}>
                                    <span>Enquiry Now</span>
                                    <IoIosArrowForward size={18} />
                                </div>
                            </DetailSlideActionButton>
                        )}
                    </PostMedia>
                    <OverlayContent style={{ paddingBottom: isLastImage ? '110px' : undefined }}>
                        <UserRow>
                            {/* <DetailAvatar src={post.attachment} alt={post.attachment} /> */}
                            {/* {post?.attachment ? (
                                <DetailAvatar
                                    src={post.attachment}
                                    alt="attachment"
                                />
                            ) : (
                                <UserAvatarFallback>
                                    <FaUser />
                                </UserAvatarFallback>
                            )} */}
                            <DetailAvatar src={post.createduserid?.photo} alt={post.createduserid?.photo} />
                            <DetailUserInfo>
                                <DetailUserName>{post.createduserid ? post.createduserid?.name : post.username}</DetailUserName>
                                <DetailUserLocation>{post.createduserid ? post.createduserid?.username : post.username}</DetailUserLocation>
                            </DetailUserInfo>
                        </UserRow>
                        {/* {post.title && <TextContentTitle>{post.title}</TextContentTitle>} */}
                        <DetailCaption>{captionText}</DetailCaption>
                        <DetailTime>{titleText}</DetailTime>
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
                            <DetailAvatar src={post.createduserid?.photo} alt={post.createduserid?.photo} />
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
                        <IoArrowBack size={20} color="#ffffff" />
                    </BackButton>
                    <OverlayContent>
                        {titleText && <TextContentTitle style={{ marginTop: "40px" }}>{titleText}</TextContentTitle>}
                        <TextContentBody>{captionText}</TextContentBody>
                        <UserRow>
                            <DetailAvatar src={post.createduserid?.photo} alt={post.createduserid?.photo} />
                            <DetailUserInfo>
                                <DetailUserName>{post.username}</DetailUserName>
                                <DetailUserLocation>{post.location}</DetailUserLocation>
                            </DetailUserInfo>
                        </UserRow>
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