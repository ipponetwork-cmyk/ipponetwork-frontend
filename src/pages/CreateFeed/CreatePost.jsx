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
    ActionInputField, ActionInputLabel, ActionInputContainer, ActionPhonePrefix, ActionInput, ActionTextarea, ActionLinkInputContainer, ActionLinkIcon, Action, PublishButton
} from '../../css/index';
import { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { MdInsertPhoto } from "react-icons/md";
import { IoMdAttach } from "react-icons/io";
import { useTranslation } from '../../hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/createPostActions';
import { authAPI } from '../../services/api';
import { CiCalendar } from "react-icons/ci";
import { BsWhatsapp } from "react-icons/bs";
import { MdOutlineOpenInNew } from "react-icons/md";
import { IoGlobeOutline, IoTerminalOutline, IoSettingsOutline } from "react-icons/io5";
// import { IoGlobeOutline, IoTerminalOutline, IoSettingsOutline } from "react-icons/io5";
import {
    IoChevronDownOutline,
    IoCheckmarkOutline,
    IoLinkOutline
} from "react-icons/io5";
import { IoCallSharp } from "react-icons/io5";
import { showToast } from '../../redux/actions';
import Loader from '../../components/Loader';
import { getDomainName } from '../../utils/domainUtils';
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
    const [callPhone, setCallPhone] = useState('')
    const [whatsappPhone, setWhatsappPhone] = useState('')
    const [whatsappMessage, setWhatsappMessage] = useState('')
    const [externalLink, setExternalLink] = useState('')

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(currentUser, "currentUser123")
    const createduserid = currentUser?._id || currentUser?.id || '';
    const createdusername = currentUser?.username || currentUser?.name || '';
    const FREE_TYPE = import.meta.env.VITE_FREE_TYPE;
    const COST_TYPE = import.meta.env.VITE_COST_TYPE;
    const handleMediaUpload = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const newImages = [];
            let newVideo = null;

            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    newImages.push({
                        file,
                        url: URL.createObjectURL(file),
                        name: file.name
                    });
                } else if (file.type.startsWith('video/')) {
                    if (file.size > 50 * 1024 * 1024) {
                        dispatch(showToast('Video size should be less than 50MB', 'error'));
                    } else {
                        newVideo = {
                            file,
                            url: URL.createObjectURL(file),
                            name: file.name
                        };
                    }
                }
            });

            if (newImages.length > 0) {
                setUploadedImages(prev => [...prev, ...newImages]);
            }
            if (newVideo) {
                setUploadedVideo(newVideo);
            }
        }
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
        if (file) setUploadedPdf({ file, url: URL.createObjectURL(file), name: file.name });
    };
    const unitSeconds = {
        Minutes: 60,
        Hours: 3600,
        Days: 86400,
    };

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

    const calculateCredits = (seconds, costPerSecond) => {
        if (!seconds || !costPerSecond) return 0;
        return Number((seconds * costPerSecond).toFixed(2));
    };

    useEffect(() => {
        setIsDraftSaved(false);
    }, [title, description, selectedDomains, selectedAction, callPhone, whatsappPhone, whatsappMessage, externalLink, count, selected, on, uploadedImages, uploadedVideo, uploadedPdf]);

    const loadTimeToLive = async (domain = 'ippochennai') => {
        try {
            const response = await authAPI.getTimeToLive(domain);
            const items = Array.isArray(response) ? response : response.data || [];
            console.log(items, "items123")
            // Find items by type only to capture the dynamic posttype and seconds from API

            const freeItem = items.find(item => item.type === FREE_TYPE);
            const costItem = items.find(item => item.type === COST_TYPE);
            console.log(costItem, "costItem123")
            setFreeTtl(freeItem || null);
            setCostTtl(costItem || null);

            if (!on && freeItem) {
                setCount(calculateCountFromSeconds(freeItem.seconds, selected));
            }
            if (on && costItem && !count) {
                setCount('1');
            }
        } catch (error) {
            console.error('Failed to load time to live', error);
        }
    };

    useEffect(() => {
        let active = true;
        // const initialUnit = 'Minutes';
        // const initialOn = false;
        // const initialCount = '1';

        authAPI.getListOfValuesByType('domain')
            .then((response) => {
                if (!active) return;
                const items = Array.isArray(response) ? response : response.data || [];
                const mapped = Array.isArray(items)
                    ? items.map(item => ({
                        id: item._id,
                        name: item.value || item.name,
                        value: item.value || item.name,
                        icon: <IoGlobeOutline fontSize={18} color="#777" />,
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

        loadTimeToLive('ippochennai')
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
        }
    };

    const handleToggle = () => {
        const nextOn = !on;
        setOn(nextOn);
        if (nextOn) {
            loadTimeToLive();
            if (!count) setCount('1');
        } else if (freeTtl) {
            setCount(calculateCountFromSeconds(freeTtl.seconds, selected));
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
        const totalseconds = isfreeornot ? (freeTtl?.seconds || 0) : derivedSeconds;

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
        } else if (selectedAction === 'call') {
            if (!/^\d{10}$/.test(callPhone)) {
                dispatch(showToast('Please enter a valid 10-digit phone number', 'error'));
                return;
            }
        } else if (selectedAction === 'link') {
            if (!externalLink || !externalLink.startsWith('http')) {
                dispatch(showToast('Please enter a valid URL (starting with http:// or https://)', 'error'));
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
        } else if (selectedAction === 'call') {
            formData.append('callnumber', '91' + callPhone);
        }

        uploadedImages.forEach(image => {
            formData.append('attachment', image.file);
        });
        if (uploadedPdf?.file) {
            formData.append('attachment', uploadedPdf.file);
        }
        if (uploadedVideo?.file) {
            formData.append('attachment', uploadedVideo.file);
        }

        try {
            setIsSubmitting(true);
            await dispatch(createPost(formData));
            setSubmitError('');

            if (statusType === 'DRAFT') {
                setIsDraftSaved(true);
            } else {
                navigate('/feed');
            }
        } catch (error) {
            dispatch(showToast(error?.message || 'Failed to create post', 'error'));
            setSubmitError(error?.message || 'Failed to create post');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFreeMode = !on && Boolean(freeTtl);
    const isCostMode = on && Boolean(costTtl);
    const derivedSeconds = calculateSeconds(count, selected);
    const derivedCredits = isCostMode ? calculateCredits(derivedSeconds, costTtl.unit) : 0;


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
        { id: 'call', title: t('call'), description: t('talkInstantly'), icon: <IoCallSharp fontSize={20} color="#f0f0f0" /> },
        { id: 'whatsapp', title: t('whatsapp'), description: t('sendQuickMessage'), icon: <BsWhatsapp fontSize={18} color="#f0f0f0" /> },
        { id: 'link', title: t('externalLink'), description: t('visitMoreDetails'), icon: <MdOutlineOpenInNew fontSize={18} color="#f0f0f0" /> }
    ]

    const getSelectedAction = () => actionMethods.find(m => m.id === selectedAction)

    // const getDomainName = () => {
    //     const host = window.location.hostname;

    //     if (host === 'localhost') {
    //         return 'ippomani.com';
    //     }

    //     const parts = host.split('.');
    //     const domain = parts.find(part => part.startsWith('ippo'));

    //     return domain ?? parts[0];
    // };
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

                        {/* Video Preview */}
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

                        {/* Images Preview */}
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
                        />
                        <input
                            id="pdf-upload"
                            type="file"
                            accept=".pdf"
                            style={{ display: 'none' }}
                            onChange={handlePdfUpload}
                        />

                        <ToolButton title={t('addMedia')} as="label" htmlFor="media-upload" style={{ cursor: 'pointer' }}>
                            <MdInsertPhoto fontSize={30} color="white" />
                        </ToolButton>
                        <ToolButton title={t('attachFile')} as="label" htmlFor="pdf-upload" style={{ cursor: 'pointer' }}>
                            <IoMdAttach fontSize={30} />
                        </ToolButton>
                        <DraftStatus onClick={() => handleCreatePost("DRAFT")}>
                            {isDraftSaved ? (t('draftSaved') || 'Draft Saved') : (t('save Draft') || 'Save Draft')}
                            <PulseDot />
                        </DraftStatus>
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
                            <CountBtn disabled={isFreeMode} onClick={() => setCount(v => formatCount(Math.max(0, Number(v || '0') - 1)))}>−</CountBtn>
                            <CountValue
                                type="number"
                                value={count}
                                min="0"
                                disabled={isFreeMode}
                                onChange={handleCountChange}
                            />
                            <CountAddBtn disabled={isFreeMode} onClick={() => setCount(v => formatCount(Number(v || '0') + 1))}>+</CountAddBtn>
                        </CounterRow>
                        <UnitRow>
                            <Select
                                value={selected}
                                onChange={(e) => handleUnitChange(e.target.value)}
                                variant="standard"
                                disableUnderline
                                sx={{
                                    color: '#777',
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    fontFamily: 'Sora, sans-serif',
                                    '& .MuiSelect-icon': { color: '#777' },
                                    '& .MuiSelect-select': { paddingBottom: 0 },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            background: '#1e1e22',
                                            border: '1px solid #2a2a2e',
                                            borderRadius: '14px',
                                            mt: 1,
                                            '& .MuiMenuItem-root': {
                                                fontSize: '13px',
                                                fontWeight: 500,
                                                color: '#777',
                                                justifyContent: 'center',
                                                '&.Mui-selected': {
                                                    background: '#2a2a2e',
                                                    color: '#f0f0f0',
                                                },
                                                '&:hover': {
                                                    background: '#2a2a2e',
                                                    color: '#f0f0f0',
                                                },
                                            },
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="Minutes">Minutes</MenuItem>
                                <MenuItem value="Hours">Hours</MenuItem>
                                <MenuItem value="Days">Days</MenuItem>
                            </Select>
                        </UnitRow>
                    </PeriodSection>
                    <BorderLine />
                    <Grid>
                        <InfoCard>
                            <InfoHeader>
                                <CiCalendar fontSize={20} color="white" />
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
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="7" />
                                    <path d="M21 21l-4.35-4.35" />
                                </svg>
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
                                {selectedAction === "call" && (
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
                                )}

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
                <div style={{ marginTop: "12px" }}>
                    <DraftStatus onClick={() => handleCreatePost("DRAFT")}>
                        {isDraftSaved ? (t('draftSaved') || 'Draft Saved') : (t('save Draft') || 'Save Draft')}
                    </DraftStatus>
                </div>
                <PublishButton onClick={() => handleCreatePost("SUBMITTED")} disabled={isSubmitting}>
                    {isSubmitting ? t('publishing') || 'Publishing...' : t('publish')}
                </PublishButton>
            </CreatePostWrapper>
        </>
    );
};

export default CreatePost;