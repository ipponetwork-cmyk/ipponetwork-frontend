import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    DetailWrapper, BackButton, OverlayContent, UserRow,
    DetailAvatar, DetailUserInfo, DetailUserName, DetailUserLocation,
    DetailCaption, DetailTime, DetailEnquiryButton,
    PostMedia, SliderTrack, SliderImage, CarouselDots, Dot,
    TextContentTitle, TextContentBody,
    DetailFooter, ActionBar, EnquiryBadge, EnquiryText, IconButton,
    DetailSlideActionButton, VideoWrapper, PostVideo,
    UserAvatarFallback,
} from '../../css/index';
import { IoArrowBack } from 'react-icons/io5';
import { RiSearchEyeLine } from "react-icons/ri";
import { IoIosArrowForward, IoIosShareAlt } from "react-icons/io";
import { postAPI } from '../../services/postAPI';
import SharePostDialog from '../../components/SharePostDialog';
import { getDynamicText } from '../../utils/languageUtils';
import Loader from '../../components/Loader';
import { FaUser } from 'react-icons/fa';
import { showToast } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { InteractiveIcon } from '../../components/InteractiveIcon';


const FooterBar = ({ enquirycount, onShare }) => (
    <DetailFooter>
        <ActionBar>
            <EnquiryBadge>
                <InteractiveIcon size={20} style={{ display: 'block', flexShrink: 0 }} />
                <EnquiryText>{enquirycount}</EnquiryText>
            </EnquiryBadge>
            <IconButton onClick={onShare}>
                <IoIosShareAlt size={20} />
            </IconButton>
        </ActionBar>
    </DetailFooter>
);

const FeedDetail = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSlide, setActiveSlide] = useState(0);
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [enquiryCount, setEnquiryCount] = useState(0);
    const [dynamicLanguage, setDynamicLanguage] = useState(() => localStorage.getItem('language') || 'en');
    const dispatch = useDispatch();
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const handleEnquiryClick = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            dispatch(showToast('Login to continue', 'info'));
            setTimeout(() => navigate('/login'), 1500);
            return;
        }
        try {
            await postAPI.increaseEnquiryCount(post._id);

            // Safely extract action type
            let rawActionType = typeof post.calltoaction === 'string'
                ? post.calltoaction
                : (post.calltoaction?.type || post.calltoactiontype || '');
            let actionType = String(rawActionType).toLowerCase().replace(/[^a-z]/g, '');

            // Safely extract target values
            const waNumber = post.whatsappnumber || post.calltoaction?.whatsappnumber || post.calltoaction?.number || post.number;
            const waMessage = post.whatsappmessage || post.calltoaction?.whatsappmessage || post.calltoaction?.message || 'Hi, I am interested in your post';
            const cNumber = post.calltomobilenumber || post.calltoaction?.calltomobilenumber || post.calltoaction?.number || post.number;
            const extLink = post.calltoaction?.externallinkurl || post.calltoactionexternallinkurl || post.externallinkurl || post.calltoaction?.url;

            // Infer actionType if not explicitly provided
            if (!actionType) {
                if (waNumber) actionType = 'whatsapp';
                else if (cNumber) actionType = 'call';
                else if (extLink) actionType = 'externallink';
            }

            if (actionType.includes('whatsapp') && waNumber) {
                window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`, '_blank');
            } else if (actionType.includes('call') && cNumber) {
                window.location.href = `tel:${cNumber}`;
            } else if (actionType.includes('external') && extLink) {
                const finalUrl = extLink.startsWith('http://') || extLink.startsWith('https://')
                    ? extLink
                    : 'https://' + extLink;
                window.open(finalUrl, '_blank');
            } else {
                alert('Action not configured for this post (Missing data or unknown type: ' + actionType + ')');
            }

        } catch (err) {
            console.error('Enquiry error:', err);
        }
    };
    useEffect(() => {
        if (!postId) {
            navigate('/feed');
            return;
        }
        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await postAPI.getPostById(postId);
                console.log(response, "POST RESPONSE1223")
                if (response.success && response.data) {
                    const apiPost = response.data;
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
                    if (videoFile) type = 'video';
                    else if (imageFiles.length > 0) type = 'image';

                    const mapped = {
                        id: apiPost._id,
                        _id: apiPost._id,
                        type,
                        username: apiPost.createdusername || 'User',
                        location: apiPost.listofdomain?.[0] || 'Location',
                        images: imageFiles,
                        video: videoFile,
                        titleObj: apiPost.title,
                        captionObj: apiPost.description,
                        time: new Date(apiPost.createdtimestamp).toLocaleDateString(),
                        enquirycount: apiPost.enquirycount || 0,
                        whatsappnumber: apiPost.calltoaction?.whatsappnumber,
                        whatsappmessage: apiPost.calltoaction?.whatsappmessage,
                        calltomobilenumber: apiPost.calltoaction?.callnumber,
                        calltoactiontype: apiPost.calltoaction?.type,
                        createduserid: apiPost.createduserid,
                        shareurl: apiPost.shareurl,
                        profilepicture: apiPost.photo,
                    };

                    setPost(mapped);
                    setEnquiryCount(mapped.enquirycount);
                }
            } catch (err) {
                console.error('Failed to fetch post:', err);
                navigate('/feed');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId, navigate]);

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

    const captionText = getDynamicText(post?.captionObj, dynamicLanguage, post?.captionEn || '');
    const titleText = getDynamicText(post?.titleObj, dynamicLanguage, post?.titleEn || 'Post Title');

    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
    const handleTouchEnd = (mediaCount) => {
        if (!touchStartX.current || !touchEndX.current) return;
        const diff = touchStartX.current - touchEndX.current;
        if (diff > 50 && activeSlide < mediaCount - 1) setActiveSlide(p => p + 1);
        else if (diff < -50 && activeSlide > 0) setActiveSlide(p => p - 1);
        touchStartX.current = null;
        touchEndX.current = null;
    };

    // const isLastImage = post?.type === 'image' && activeSlide === post.images?.length - 1;

    // All hooks above — safe to return conditionally now
    if (loading) return <div style={{ textAlign: 'center' }}><Loader /></div>;
    if (!post) return null;
    console.log(post, "POST DATA IN DETAIL")
    const mediaList = [];
    if (post.video) mediaList.push({ type: 'video', url: post.video });
    if (post.images && post.images.length > 0) {
        post.images.forEach(img => mediaList.push({ type: 'image', url: img }));
    }

    if (mediaList.length > 0) {
        const isLastSlide = activeSlide === mediaList.length - 1;
        return (
            <>
                <DetailWrapper>
                    <BackButton onClick={() => navigate(-1)}>
                        <IoArrowBack size={20} color="#ffffff" />
                    </BackButton>
                    <PostMedia
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={() => handleTouchEnd(mediaList.length)}
                    >
                        <SliderTrack activeSlide={activeSlide}>
                            {mediaList.map((item, i) => (
                                item.type === 'video' ? (
                                    <VideoWrapper key={i} style={{ minWidth: '100%' }}>
                                        <PostVideo autoPlay muted loop playsInline controls>
                                            <source src={item.url} type="video/mp4" />
                                        </PostVideo>
                                    </VideoWrapper>
                                ) : (
                                    <SliderImage key={i} src={item.url} alt={`slide-${i}`} />
                                )
                            ))}
                        </SliderTrack>
                        {mediaList.length > 1 && (
                            <CarouselDots>
                                {mediaList.map((_, i) => (
                                    <Dot key={i} active={i === activeSlide} onClick={() => setActiveSlide(i)} />
                                ))}
                            </CarouselDots>
                        )}
                        {mediaList[activeSlide]?.type === 'image' && isLastSlide && (
                            <DetailSlideActionButton onClick={handleEnquiryClick}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4px" }}>
                                    <span>Enquire</span>
                                    <IoIosArrowForward size={18} />
                                </div>
                            </DetailSlideActionButton>
                        )}
                    </PostMedia>
                    <OverlayContent style={{ paddingBottom: isLastSlide ? '110px' : undefined }}>
                        <UserRow>
                            {post?.createduserid?.photo ? (
                                <DetailAvatar src={post.createduserid.photo} alt="user" />
                            ) : (
                                <UserAvatarFallback>
                                    <FaUser />
                                </UserAvatarFallback>
                            )}
                            <DetailUserInfo>
                                <DetailUserName>{post?.createduserid?.name}</DetailUserName>
                                <DetailUserLocation>{post.createduserid?.username}</DetailUserLocation>
                            </DetailUserInfo>
                        </UserRow>
                        <DetailCaption>{captionText}</DetailCaption>
                        <DetailTime>{post.type === 'image' ? titleText : post.time}</DetailTime>
                        <DetailEnquiryButton onClick={handleEnquiryClick}>Enquire</DetailEnquiryButton>
                        <FooterBar enquirycount={enquiryCount} onShare={() => setShareDialogOpen(true)} />
                    </OverlayContent>
                </DetailWrapper>
                <SharePostDialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)} postId={post.id} />
            </>
        );
    }

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
                            <DetailAvatar src={post.createduserid?.photo} alt="user" />
                            <DetailUserInfo>
                                <DetailUserName>{post?.createduserid?.name}</DetailUserName>
                                <DetailUserLocation>{post?.createduserid?.username}</DetailUserLocation>
                            </DetailUserInfo>
                        </UserRow>
                        <DetailTime>{post.time}</DetailTime>
                        <DetailEnquiryButton onClick={handleEnquiryClick}>Enquire</DetailEnquiryButton>
                        <FooterBar enquirycount={enquiryCount} onShare={() => setShareDialogOpen(true)} />
                    </OverlayContent>
                </DetailWrapper>
                <SharePostDialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)} postId={post.id} />
            </>
        );
    }

    return null;
};

export default FeedDetail;