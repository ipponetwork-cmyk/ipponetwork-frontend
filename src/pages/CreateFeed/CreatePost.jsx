import {
    PhoneFrame, ContentArea, CreatePostWrapper, TitleInput, Divider, BodyInput, Toolbar, ToolButton, DraftStatus, PulseDot, Header, CreatePostBackButton, HeaderTitle, Card,
    Banner, BannerLeft, RocketBadge, BannerInfo, BannerTitle, BannerSub,
    ToggleTrack, ToggleThumb,
    PeriodSection, PeriodLabel,
    CounterRow, CountBtn, CountValue,
    UnitRow, UnitText,
    Grid, InfoCard, InfoHeader, InfoLabel, InfoValue, InfoSub,
    CountAddBtn, DomainCard, DomainHeader, DomainSearch, SearchIcon, DomainInput, BorderLine, TitleText, ChooseDomain,
    DomainList, DomainListItem, DomainItemLeft, DomainIcon, DomainName, DomainCheckbox,
    ActionButtonSection, ActionButtonLabel, ActionButtonDropdown, ActionButtonList, ActionButtonItem, ActionButtonItemIcon, ActionButtonItemContent, ActionButtonItemTitle, ActionButtonItemDescription, ActionButtonItemCheckmark,
    ActionButtonContent, ActionButtonHeader, ActionButtonHeaderLeft, ActionButtonHeaderIcon, ActionButtonHeaderInfo, ActionButtonHeaderTitle, ActionButtonHeaderSubtitle, ActionButtonHeaderChevron,
    ActionInputField, ActionInputLabel, ActionInputContainer, ActionPhonePrefix, ActionInput, ActionTextarea, ActionLinkInputContainer, ActionLinkIcon, Action, PublishButton,
    StyledSelect,
    selectMenuProps,
    EnquiryButton
} from '../../css/index';
import { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { MdInsertPhoto } from "react-icons/md";
import { IoMdAttach } from "react-icons/io";
import { useTranslation } from '../../hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { createPost } from '../../redux/createPostActions';
import { authAPI } from '../../services/api';
import { CiCalendar } from "react-icons/ci";
import { BsWhatsapp } from "react-icons/bs";
import { MdOutlineOpenInNew } from "react-icons/md";
import { IoGlobeOutline, IoTerminalOutline, IoSettingsOutline } from "react-icons/io5";
// import { IoGlobeOutline, IoTerminalOutline, IoSettingsOutline } from "react-icons/io5";
import {
    IoChevronDownOutline,
    IoCheckmarkOutline,
    IoLinkOutline,
    IoSearchOutline
} from "react-icons/io5";
import { showToast } from '../../redux/actions';
import Loader from '../../components/Loader';
import { getDomainName, getDomainPassingName } from '../../utils/domainUtils';
import { compressImage } from '../../utils/imageUtils';
import { POST_STATUS } from '../../constants/constants';

const CreditIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <circle cx="7" cy="15" r="1" fill="#555" stroke="none" />
    </svg>
)

const getNow = () => Date.now();

const CreatePost = () => {
    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [on, setOn] = useState(false)
    const [count, setCount] = useState('60')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selected, setSelected] = useState('Minutes')
    const [showDomainDropdown, setShowDomainDropdown] = useState(false)
    const [selectedDomains, setSelectedDomains] = useState(new Set())
    const [domains, setDomains] = useState([])
    const [domainSearch, setDomainSearch] = useState('');
    const [freeTtl, setFreeTtl] = useState(null)
    const [costTtl, setCostTtl] = useState(null)
    console.log(costTtl, "costTtlcostTtl133")
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploadedPdf, setUploadedPdf] = useState(null);
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const [submitError, setSubmitError] = useState('');
    console.log(submitError, "submitError")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDraftSaved, setIsDraftSaved] = useState(false);
    const [showActionDropdown, setShowActionDropdown] = useState(false)
    const [selectedAction, setSelectedAction] = useState('')
    const [whatsappPhone, setWhatsappPhone] = useState('')
    const [whatsappMessage, setWhatsappMessage] = useState('')
    const [externalLink, setExternalLink] = useState('')
    const currentUser = useSelector((state) => state.profileDetails);
    console.log(currentUser?.data, "currentUser123")
    const currentUserData = localStorage.getItem('user');
    const user = JSON.parse(currentUserData);
    console.log(user, "user");
    const createduserid = user?._id || user?.id;
    const createdusername = user?.username;
    const domainPassing = getDomainPassingName()
    console.log(domainPassing, "domainPassing")
    const FREE_TYPE = import.meta.env.VITE_FREE_TYPE;
    const COST_TYPE = import.meta.env.VITE_COST_TYPE;
    const handleMediaUpload = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        if (uploadedPdf) {
            dispatch(showToast('Cannot upload images/video when a PDF is already attached', 'error'));
            e.target.value = '';
            return;
        }
        const newImages = [];
        let newVideo = null;

        for (const file of Array.from(files)) {
            if (file.type.startsWith('image/')) {
                try {
                    const compressed = await compressImage(file);   // ← compress here
                    newImages.push({
                        file: compressed,                            // ← store compressed file
                        url: URL.createObjectURL(compressed),
                        name: file.name,
                    });
                } catch {
                    // fallback to original if compression fails
                    newImages.push({
                        file,
                        url: URL.createObjectURL(file),
                        name: file.name,
                    });
                }
            } else if (file.type.startsWith('video/')) {
                if (file.size > 50 * 1024 * 1024) {
                    dispatch(showToast('Video size is too large. Please upload a video smaller Size', 'error'));
                } else {
                    newVideo = {
                        file,
                        url: URL.createObjectURL(file),
                        name: file.name,
                    };
                }
            }
        }

        if (newImages.length > 0) setUploadedImages(prev => [...prev, ...newImages]);
        if (newVideo) setUploadedVideo(newVideo);
        e.target.value = '';
    };
    const removeVideo = () => {
        setUploadedVideo(null);
    };

    const removeImage = (index) => {
        setUploadedImages(uploadedImages.filter((_, i) => i !== index));
    };

    const handlePdfUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (uploadedImages.length > 0 || uploadedVideo) {
            dispatch(showToast('Cannot upload PDF when images or video are already attached', 'error'));
            e.target.value = '';
            return;
        }

        setUploadedPdf({ file, url: URL.createObjectURL(file), name: file.name });
        e.target.value = '';
    };
    const [unitSeconds, setUnitSeconds] = useState({
        Minutes: 60,
        Hours: 3600,
        Days: 86400,
    })

    const formatCount = (value) => {
        if (value === undefined || value === null || Number.isNaN(value)) return '0';
        const formatted = Number(value).toFixed(2).replace(/\.?0+$/, '');
        return formatted === '' ? '0' : formatted;
    };

    const calculateCountFromSeconds = (seconds, unit) => {
        if (!seconds || !unit) return '0';
        return formatCount(seconds / unitSeconds[unit]);
    };

    const calculateSeconds = (value, unit) => {
        const num = Number(value) || 0;
        return num * unitSeconds[unit];
    };

    // const calculateCredits = (seconds, costPerSecond) => {
    //     if (!seconds || !costPerSecond) return 0;
    //     return Number((seconds * costPerSecond).toFixed(2));
    // };

    useEffect(() => {
        setIsDraftSaved(false);
    }, [title, description, selectedDomains, selectedAction, whatsappPhone, whatsappMessage, externalLink, count, selected, on, uploadedImages, uploadedVideo, uploadedPdf]);

    // const loadTimeToLive = async (domain = 'ippochennai') => {
    //     try {
    //         const response = await authAPI.getTimeToLive(domain);
    //         const items = Array.isArray(response) ? response : response.data || [];
    //         console.log(items, "items123")
    //         // Find items by type only to capture the dynamic posttype and seconds from API

    //         const freeItem = items.find(item => item.type === FREE_TYPE);
    //         const costItem = items.find(item => item.type === COST_TYPE);
    //         console.log(costItem, "costItem123")
    //         setFreeTtl(freeItem || null);
    //         setCostTtl(costItem || null);

    //         if (!on && freeItem) {
    //             setCount(calculateCountFromSeconds(freeItem.seconds, selected));
    //         }
    //         if (on && costItem && !count) {
    //             setCount('1');
    //         }
    //     } catch (error) {
    //         console.error('Failed to load time to live', error);
    //     }
    // };

    // const loadTimeToLive = async (domain = domainPassing) => {
    //     try {
    //         const response = await authAPI.getTimeToLive(domain);
    //         const items = Array.isArray(response) ? response : response.data || [];

    //         const freeItem = items.find(item => item.type === FREE_TYPE);
    //         const costItem = items.find(item => item.type === COST_TYPE);

    //         setFreeTtl(freeItem || null);
    //         setCostTtl(costItem || null);

    //         if (freeItem?.seconds) {
    //             const freeSeconds = freeItem.seconds; // 3600

    //             setUnitSeconds({
    //                 Minutes: freeSeconds,                  // 3600 * 1 = 3600s per "minute unit"
    //                 Hours: freeSeconds * 60,               // 3600 * 60
    //                 Days: freeSeconds * 1440,              // 3600 * 1440
    //             });

    //             // Show count as: unit * seconds (free)
    //             const freeDisplayCount = freeItem.unit * freeItem.seconds; // 0 * 3600 = 0
    //             // Fallback: show how many "units" fit → freeSeconds / 60
    //             setCount(String(freeDisplayCount || freeSeconds / 60));
    //         }

    //         if (costItem?.seconds) {
    //             // Cost display: unit * seconds → 0.01 * 1 = 0.01 credits per second
    //             const costDisplayCount = costItem.unit * costItem.seconds; // 0.01
    //             if (on && !count) setCount(String(costDisplayCount));
    //         }

    //     } catch (error) {
    //         console.error('Failed to load time to live', error);
    //     }
    // };

    const loadTimeToLive = async (domain = domainPassing) => {
        try {
            const response = await authAPI.getTimeToLive(domain);
            const items = Array.isArray(response) ? response : response.data || [];

            const freeItem = items.find(item => item.type === FREE_TYPE);
            const costItem = items.find(item => item.type === COST_TYPE);

            setFreeTtl(freeItem || null);
            setCostTtl(costItem || null);

            // Reset to real time units
            setUnitSeconds({ Minutes: 60, Hours: 3600, Days: 86400 });

            // Default display: show free period in minutes
            if (!on && freeItem?.seconds) {
                setCount(String(freeItem.seconds / 60)); // 3600/60 = 60 minutes
                setSelected('Minutes');
            }
        } catch (error) {
            console.error('Failed to load time to live', error);
        }
    };

    useEffect(() => {
        let active = true;
        authAPI.getListOfValuesByType('domain')
            .then((response) => {
                if (!active) return;
                const items = Array.isArray(response) ? response : response.data || [];
                const mapped = Array.isArray(items)
                    ? items.map(item => ({
                        id: item._id,
                        name: item.value || item.name,
                        value: item.value || item.name,
                        icon: <IoGlobeOutline fontSize={18} color="#ffffff" />,
                    }))
                    : [];
                setDomains(mapped);

                // Auto-select the domain matching current hostname
                const matchedDomain = mapped.find(
                    d => d.value?.toLowerCase() === domainName?.toLowerCase()
                );
                if (matchedDomain) {
                    setSelectedDomains(new Set([matchedDomain.id]));
                }
            })
            .catch((error) => {
                console.error('Failed to load domain list', error);
            });

        loadTimeToLive(domainPassing)
            .catch((error) => {
                console.error('Failed to load time to live', error);
            });

        return () => {
            active = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleUnitChange = (nextUnit) => {
        setSelected(nextUnit);
        if (!on && freeTtl) {
            setCount(calculateCountFromSeconds(freeTtl.seconds, nextUnit));
        } else if (nextUnit === 'Minutes') {
            setCount('60');
        } else {
            setCount('1');
        }
    };

    const handleToggle = () => {
        const nextOn = !on;
        setOn(nextOn);
        if (nextOn) {
            loadTimeToLive();
            if (!count) setCount('1');
        } else {
            setSelected('Minutes');
            if (freeTtl) {
                setCount(calculateCountFromSeconds(freeTtl.seconds, 'Minutes'));
            } else {
                setCount('60');
            }
        }
    };

    const handleCountChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setCount(value);
        }
    };

    const selectedDomainValues = domains
        .filter(domain => selectedDomains.has(domain.id))
        .map(domain => domain.value);

    const handleCreatePost = async (statusType) => {
        console.log("Creating post with data:")
        setSubmitError('');

        if (!title.trim() || !description.trim()) {
            dispatch(showToast('Title and description are required', 'error'));
            setSubmitError('Title and description are required');
            return;
        }

        if (selectedDomainValues.length === 0) {
            dispatch(showToast('Please select at least one domain', 'error'));
            setSubmitError('Please select at least one domain');
            return;
        }

        const createdbydomain = selectedDomainValues;
        const isfreeornot = !on;
        // const currentTtl = isfreeornot ? freeTtl : costTtl;
        const posttype = import.meta.env.VITE_POST_TYPE || 'FEED';
        // const totalseconds = isfreeornot ? (freeTtl?.seconds || 0) : derivedSeconds;
        const freeSeconds = freeTtl?.seconds || 0;
        const totalseconds = isfreeornot
            ? freeSeconds
            : Math.max(0, derivedSeconds - freeSeconds);

        // CTA Validation
        if (!selectedAction) {
            dispatch(showToast('Please select a call to action method', 'error'));
            return;
        }

        if (selectedAction === 'whatsapp') {
            if (!/^\d{10}$/.test(whatsappPhone)) {
                dispatch(showToast('Please enter a valid 10-digit WhatsApp number', 'error'));
                return;
            }
        }
        else if (selectedAction === 'link') {
            if (!externalLink) {
                dispatch(showToast('Please enter a URL', 'error'));
                return;
            }
        }

        const status = statusType; const formData = new FormData();
        formData.append('title', title.trim());
        formData.append('description', description.trim());
        selectedDomainValues.forEach(domain => formData.append('listofdomain', domain));
        formData.append('isfreeornot', String(isfreeornot));
        formData.append('createdbydomain', JSON.stringify(createdbydomain));
        formData.append('totalseconds', String(totalseconds));
        formData.append('calltoaction', selectedAction);
        formData.append('calltoactiontype', selectedAction === 'link' ? 'externallink' : selectedAction);
        formData.append('status', status);
        formData.append('posttype', posttype);
        formData.append('createduserid', createduserid);
        formData.append('createdusername', createdusername);

        // Handle different action types
        if (selectedAction === 'whatsapp') {
            formData.append('whatsappnumber', '91' + whatsappPhone);
            formData.append('whatsappmessage', whatsappMessage || 'Hi, I am interested in your post');
        } else if (selectedAction === 'link') {
            formData.append('calltoactionexternallinkurl', externalLink);
        }

        if (uploadedPdf && (uploadedImages.length > 0 || uploadedVideo)) {
            dispatch(showToast('Cannot combine PDF with images or video', 'error'));
            return;
        }

        uploadedImages.forEach(image => {
            formData.append('attachment', image.file, image.name);
        });
        if (uploadedPdf?.file) {
            formData.append('attachment', uploadedPdf.file, uploadedPdf.name);
        }
        if (uploadedVideo?.file) {
            formData.append('attachment', uploadedVideo.file, uploadedVideo.name);
        }

        // Log FormData contents for debugging
        console.log('FormData contents:', {
            title,
            description,
            domains: selectedDomainValues,
            isfreeornot,
            totalseconds,
            selectedAction,
            imagesCount: uploadedImages.length,
            hasPdf: !!uploadedPdf,
            hasVideo: !!uploadedVideo,
        });

        try {
            setIsSubmitting(true);
            // await dispatch(createPost(formData));
            await authAPI.createPost(formData);
            setSubmitError('');

            if (statusType === 'DRAFT') {
                setIsDraftSaved(true);
            } else {
                navigate('/feed');
            }
        }
        catch (error) {
            console.error('Error creating post:', error);
            const errorMsg = error?.message || 'Something went wrong';
            dispatch(showToast(errorMsg, 'error'));
            setSubmitError(errorMsg);
        }
        finally {
            setIsSubmitting(false);
        }
    };

    // const isFreeMode = !on && Boolean(freeTtl);
    // const isCostMode = on && Boolean(costTtl);
    // const derivedSeconds = calculateSeconds(count, selected);
    // const adjustedSeconds = isCostMode
    //     ? Math.max(0, derivedSeconds - (freeTtl?.seconds || 0))
    //     : 0;
    // const derivedCredits = isCostMode
    //     ? calculateCredits(adjustedSeconds, costTtl.unit * costTtl.seconds)
    //     : 0;
    const isFreeMode = !on && Boolean(freeTtl);
    const isCostMode = on && Boolean(costTtl);
    const derivedSeconds = calculateSeconds(count, selected);

    const freeSeconds = freeTtl?.seconds || 0;

    // Seconds beyond the free period
    const billableSeconds = isCostMode
        ? Math.max(0, derivedSeconds - freeSeconds)
        : 0;

    // Cost per second: unit(0.01) / seconds(1) = 0.01 per second
    const costPerSecond = isCostMode
        ? (costTtl.unit / costTtl.seconds)
        : 0;

    const derivedCredits = isCostMode
        ? Number((billableSeconds * costPerSecond).toFixed(2))
        : 0;
    const minValue = on ? (selected === 'Minutes' ? 60 : 1) : 0;

    const getEndTimeLabel = (seconds) => {
        if (!seconds) return t('todayTime') || 'Today';
        const now = new Date(getNow());
        const endDate = new Date(getNow() + (seconds * 1000));

        const isSameDay = now.toDateString() === endDate.toDateString();
        const timeStr = endDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

        if (isSameDay) {
            return timeStr;
        }

        // Check if tomorrow
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const isTomorrow = tomorrow.toDateString() === endDate.toDateString();

        if (isTomorrow) {
            return `Tomorrow, ${timeStr}`;
        }

        // Otherwise show date
        const dateStr = endDate.toLocaleDateString([], { day: 'numeric', month: 'short' });
        return `${dateStr}, ${timeStr}`;
    };

    const endsInValue = isFreeMode && freeTtl
        ? getEndTimeLabel(freeTtl.seconds)
        : getEndTimeLabel(derivedSeconds);

    const toggleDomainSelection = (domainId) => {
        const newSelected = new Set(selectedDomains)
        if (newSelected.has(domainId)) {
            newSelected.delete(domainId)
        } else {
            newSelected.add(domainId)
        }
        setSelectedDomains(newSelected)
    }


    const actionMethods = [
        { id: 'whatsapp', title: t('whatsapp'), description: t('sendQuickMessage'), icon: <BsWhatsapp fontSize={18} color="#f0f0f0" /> },
        { id: 'link', title: t('externalLink'), description: t('visitMoreDetails'), icon: <MdOutlineOpenInNew fontSize={18} color="#f0f0f0" /> }
    ]

    const getSelectedAction = () => actionMethods.find(m => m.id === selectedAction)
    const domainName = getDomainName();
    console.log(domainName, "domainName1234");

    if (isSubmitting) {
        return <Loader />;
    }

    return (
        <>
            <Header>
                <CreatePostBackButton onClick={() => navigate(-1)}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                </CreatePostBackButton>
                <HeaderTitle>{t('createPost')}</HeaderTitle>
            </Header>
            <CreatePostWrapper>
                <PhoneFrame>
                    <ContentArea>
                        <TitleInput
                            type="text"
                            placeholder={t('title')}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Divider />
                        <BodyInput
                            placeholder={t('provideContent')}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        {uploadedVideo && (
                            <div style={{
                                position: 'relative',
                                marginTop: '10px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                background: '#000'
                            }}>
                                <video
                                    src={uploadedVideo.url}
                                    controls
                                    style={{ width: '100%', display: 'block' }}
                                />
                                <button
                                    onClick={removeVideo}
                                    style={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        background: 'rgba(0,0,0,0.7)',
                                        border: 'none',
                                        borderRadius: '50%',
                                        color: '#fff',
                                        width: 28,
                                        height: 28,
                                        cursor: 'pointer',
                                        zIndex: 10,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >✕</button>
                            </div>
                        )}

                        {uploadedImages.length > 0 && (
                            <div style={{ marginTop: '10px' }}>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                                    gap: '8px',
                                    marginBottom: '8px'
                                }}>
                                    {uploadedImages.map((image, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                position: 'relative',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                aspectRatio: '1'
                                            }}
                                        >
                                            <img
                                                src={image.url}
                                                alt={`uploaded-${index}`}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <button
                                                onClick={() => removeImage(index)}
                                                style={{
                                                    position: 'absolute',
                                                    top: 4,
                                                    right: 4,
                                                    background: 'rgba(0,0,0,0.7)',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    color: '#fff',
                                                    width: 24,
                                                    height: 24,
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: 0
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <span style={{ fontSize: '12px', color: '#999' }}>
                                    {uploadedImages.length} {uploadedImages.length === 1 ? 'image' : 'images'} selected
                                </span>
                            </div>
                        )}

                        {/* PDF Preview */}
                        {uploadedPdf && (
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                marginTop: '10px', padding: '10px 12px',
                                background: '#2a2a2e', borderRadius: '8px'
                            }}>
                                <span style={{ fontSize: '20px' }}>📄</span>
                                <span style={{ color: '#f0f0f0', fontSize: '13px', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {uploadedPdf.name}
                                </span>
                                <button
                                    onClick={() => setUploadedPdf(null)}
                                    style={{
                                        background: 'none', border: 'none', color: '#777',
                                        cursor: 'pointer', fontSize: '16px', lineHeight: 1
                                    }}
                                >✕</button>
                            </div>
                        )}
                    </ContentArea>

                    <Toolbar>
                        {/* Hidden file inputs */}
                        <input
                            id="media-upload"
                            type="file"
                            accept="image/*,video/*"
                            multiple
                            style={{ display: 'none' }}
                            onChange={handleMediaUpload}
                            disabled={!!uploadedPdf}
                        />
                        <input
                            id="pdf-upload"
                            type="file"
                            accept=".pdf"
                            style={{ display: 'none' }}
                            onChange={handlePdfUpload}
                            disabled={uploadedImages.length > 0 || !!uploadedVideo}
                        />

                        <ToolButton
                            title={t('addMedia')}
                            as="label"
                            htmlFor={!uploadedPdf ? "media-upload" : ""}
                            style={{
                                cursor: !uploadedPdf ? 'pointer' : 'not-allowed',
                                opacity: !uploadedPdf ? 1 : 0.5
                            }}
                        >
                            <MdInsertPhoto fontSize={30} />
                        </ToolButton>
                        <ToolButton
                            title={t('attachFile')}
                            as="label"
                            htmlFor={!(uploadedImages.length > 0 || uploadedVideo) ? "pdf-upload" : ""}
                            style={{
                                cursor: !(uploadedImages.length > 0 || uploadedVideo) ? 'pointer' : 'not-allowed',
                                opacity: !(uploadedImages.length > 0 || uploadedVideo) ? 1 : 0.5
                            }}
                        >
                            <IoMdAttach fontSize={30} />
                        </ToolButton>
                    </Toolbar>
                </PhoneFrame>
                <Card>
                    <Banner>
                        <BannerLeft>
                            <RocketBadge>🚀</RocketBadge>
                            <BannerInfo>
                                <BannerTitle>{t('sponsorPost')}</BannerTitle>
                                <BannerSub>{t('boostVisibility')}</BannerSub>
                            </BannerInfo>
                        </BannerLeft>
                        <ToggleTrack $on={on} onClick={handleToggle}>
                            <ToggleThumb $on={on} />
                        </ToggleTrack>
                    </Banner>
                    <BorderLine />
                    <PeriodSection>
                        <PeriodLabel>{t('selectPeriod')}</PeriodLabel>
                        <CounterRow>
                            <CountBtn
                                disabled={!on || Number(count) <= minValue}
                                onClick={() => setCount(v => formatCount(Math.max(minValue, Number(v || '0') - 1)))}
                            >
                                −
                            </CountBtn>
                            <CountValue
                                type="number"
                                value={count}
                                min={minValue}
                                disabled={!on}
                                onChange={handleCountChange}
                                onBlur={() => {
                                    if (on && Number(count) < minValue) {
                                        setCount(String(minValue));
                                    }
                                }}
                            />
                            <CountAddBtn disabled={!on} onClick={() => setCount(v => formatCount(Number(v || '0') + 1))}>+</CountAddBtn>
                        </CounterRow>
                        <UnitRow>
                            {!on ? (
                                <UnitText>Minutes</UnitText>
                            ) : (
                                <StyledSelect
                                    value={selected}
                                    onChange={(e) => handleUnitChange(e.target.value)}
                                    variant="standard"
                                    disableUnderline
                                    MenuProps={selectMenuProps}
                                >
                                    <MenuItem value="Minutes">Minutes</MenuItem>
                                    <MenuItem value="Hours">Hours</MenuItem>
                                    <MenuItem value="Days">Days</MenuItem>
                                </StyledSelect>
                            )}
                        </UnitRow>
                    </PeriodSection>
                    <BorderLine />
                    <Grid>
                        <InfoCard>
                            <InfoHeader>
                                <CreditIcon />
                                <InfoLabel>{t('endsIn')}</InfoLabel>
                            </InfoHeader>
                            <InfoValue>{endsInValue}</InfoValue>
                            <InfoSub>{t('startsFromPublished')}</InfoSub>
                        </InfoCard>

                        <InfoCard>
                            <InfoHeader>
                                <CreditIcon />
                                <InfoLabel>{t('credits')}</InfoLabel>
                            </InfoHeader>
                            <InfoValue>{isFreeMode ? '-' : derivedCredits}</InfoValue>
                            <InfoSub>{t('totalCredits')}</InfoSub>
                        </InfoCard>
                    </Grid>
                </Card>
                <ChooseDomain>
                    <TitleText>{t('chooseDomains')}</TitleText>
                    <DomainCard>
                        <DomainSearch onClick={() => setShowDomainDropdown(!showDomainDropdown)}>
                            <SearchIcon>
                                <IoSearchOutline size={18} color="#777" />
                            </SearchIcon>
                            <DomainInput
                                type="text"
                                placeholder={t('searchDomains')}
                                value={domainSearch}
                                onChange={(e) => setDomainSearch(e.target.value)}
                            />
                        </DomainSearch>
                        {showDomainDropdown && (
                            <DomainList>
                                {[...domains]
                                    .filter(domain =>
                                        domain.name.toLowerCase().includes(domainSearch.toLowerCase())
                                    )
                                    .sort((a, b) => {
                                        const aSelected = selectedDomains.has(a.id);
                                        const bSelected = selectedDomains.has(b.id);
                                        if (aSelected && !bSelected) return -1;
                                        if (!aSelected && bSelected) return 1;
                                        return 0;
                                    })
                                    .map(domain => (
                                        <DomainListItem
                                            key={domain.id}
                                            $isSelected={selectedDomains.has(domain.id)}
                                            onClick={() => toggleDomainSelection(domain.id)}
                                        >
                                            <DomainItemLeft>
                                                <DomainIcon $isSelected={selectedDomains.has(domain.id)}>
                                                    {domain.icon}
                                                </DomainIcon>
                                                <DomainName>{domain.name}</DomainName>
                                            </DomainItemLeft>
                                            <DomainCheckbox $isSelected={selectedDomains.has(domain.id)}>
                                                {selectedDomains.has(domain.id) && (
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                        <path d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </DomainCheckbox>
                                        </DomainListItem>
                                    ))}
                            </DomainList>
                        )}
                    </DomainCard>
                </ChooseDomain>
                <Action>
                    <ActionButtonSection>
                        <TitleText>{t('actionButton')}</TitleText>

                        {!selectedAction || showActionDropdown ? (
                            <>
                                <ActionButtonDropdown
                                    $isOpen={showActionDropdown}
                                    onClick={() => setShowActionDropdown(!showActionDropdown)}
                                >
                                    <span>{t('selectMethod')}</span>
                                    <IoChevronDownOutline size={18} />
                                </ActionButtonDropdown>

                                {showActionDropdown && (
                                    <ActionButtonList>
                                        {actionMethods.map(method => (
                                            <ActionButtonItem
                                                key={method.id}
                                                $isSelected={selectedAction === method.id}
                                                onClick={() => {
                                                    setSelectedAction(method.id);
                                                    setShowActionDropdown(false);
                                                }}
                                            >
                                                <ActionButtonItemIcon>
                                                    {method.icon}
                                                </ActionButtonItemIcon>

                                                <ActionButtonItemContent>
                                                    <ActionButtonItemTitle>
                                                        {method.title}
                                                    </ActionButtonItemTitle>
                                                    <ActionButtonItemDescription>
                                                        {method.description}
                                                    </ActionButtonItemDescription>
                                                </ActionButtonItemContent>

                                                <ActionButtonItemCheckmark
                                                    $isSelected={selectedAction === method.id}
                                                >
                                                    {selectedAction === method.id && (
                                                        <IoCheckmarkOutline size={18} />
                                                    )}
                                                </ActionButtonItemCheckmark>
                                            </ActionButtonItem>
                                        ))}
                                    </ActionButtonList>
                                )}
                            </>
                        ) : (
                            <ActionButtonContent>
                                <ActionButtonHeader>
                                    <ActionButtonHeaderLeft>
                                        <ActionButtonHeaderIcon>
                                            {getSelectedAction()?.icon}
                                        </ActionButtonHeaderIcon>

                                        <ActionButtonHeaderInfo>
                                            <ActionButtonHeaderTitle>
                                                {getSelectedAction()?.title}
                                            </ActionButtonHeaderTitle>
                                            <ActionButtonHeaderSubtitle>
                                                {getSelectedAction()?.description}
                                            </ActionButtonHeaderSubtitle>
                                        </ActionButtonHeaderInfo>
                                    </ActionButtonHeaderLeft>

                                    <ActionButtonHeaderChevron
                                        onClick={() => setShowActionDropdown(true)}
                                    >
                                        <IoChevronDownOutline size={18} />
                                    </ActionButtonHeaderChevron>
                                </ActionButtonHeader>

                                {/* CALL */}
                                {/* {selectedAction === "call" && (
                                    <ActionInputField>
                                        <ActionInputLabel>{t('enterPhoneNumber')}</ActionInputLabel>
                                        <ActionInputContainer>
                                            <ActionPhonePrefix>+91</ActionPhonePrefix>
                                            <ActionInput
                                                type="tel"
                                                placeholder={t('tenDigitNumber')}
                                                value={callPhone}
                                                onChange={(e) => setCallPhone(e.target.value)}
                                            />
                                        </ActionInputContainer>
                                    </ActionInputField>
                                )} */}

                                {/* WHATSAPP */}
                                {selectedAction === "whatsapp" && (
                                    <>
                                        <ActionInputField>
                                            <ActionInputLabel>{t('enterPhoneNumber')}</ActionInputLabel>
                                            <ActionInputContainer>
                                                <ActionPhonePrefix>+91</ActionPhonePrefix>
                                                <ActionInput
                                                    type="tel"
                                                    placeholder="10 digit number"
                                                    value={whatsappPhone}
                                                    onChange={(e) => setWhatsappPhone(e.target.value)}
                                                />
                                            </ActionInputContainer>
                                        </ActionInputField>

                                        <ActionInputField>
                                            <ActionInputLabel>{t('message')}</ActionInputLabel>
                                            <ActionTextarea
                                                placeholder={t('enterInitialMessage')}
                                                value={whatsappMessage}
                                                onChange={(e) => setWhatsappMessage(e.target.value)}
                                            />
                                        </ActionInputField>
                                    </>
                                )}

                                {/* LINK */}
                                {selectedAction === "link" && (
                                    <ActionInputField>
                                        <ActionInputLabel>{t('pasteLink')}</ActionInputLabel>
                                        <ActionLinkInputContainer>
                                            <ActionLinkIcon>
                                                <IoLinkOutline size={18} />
                                            </ActionLinkIcon>
                                            <ActionInput
                                                type="url"
                                                placeholder={t('exampleLink')}
                                                value={externalLink}
                                                onChange={(e) => setExternalLink(e.target.value)}
                                            />
                                        </ActionLinkInputContainer>
                                    </ActionInputField>
                                )}
                            </ActionButtonContent>
                        )}
                    </ActionButtonSection>

                </Action>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "12px" }}>
                    <DraftStatus onClick={() => handleCreatePost(POST_STATUS.DRAFT)}>
                        {isDraftSaved ? (t('draftSaved') || 'Draft Saved') : (t('save Draft') || 'Save Draft')}
                    </DraftStatus>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "12px", width: "100%", maxWidth: "400px" }}>
                    <EnquiryButton onClick={() => handleCreatePost(POST_STATUS.SUBMITTED)} disabled={isSubmitting}>
                        {isSubmitting ? t('publishing') || 'Publishing...' : t('publish')}
                    </EnquiryButton>
                </div>

            </CreatePostWrapper>
        </>
    );
};

export default CreatePost;