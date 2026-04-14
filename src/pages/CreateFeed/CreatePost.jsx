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
    ActionInputField, ActionInputLabel, ActionInputContainer, ActionPhonePrefix, ActionInput, ActionTextarea, ActionLinkInputContainer, ActionLinkIcon, Action,PublishButton
} from '../../css/index';
import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { MdInsertPhoto } from "react-icons/md";
import { IoMdAttach } from "react-icons/io";
import { useTranslation } from '../../hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
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
const CreditIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
        stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <circle cx="7" cy="15" r="1" fill="#555" stroke="none" />
    </svg>
)

const ChevronIcon = () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
        stroke="#777" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
    </svg>
)
const CreatePost = () => {
    const { t } = useTranslation();
    const [on, setOn] = useState(false)
    const [count, setCount] = useState(60)
    const navigate = useNavigate();
    const [selected, setSelected] = useState('Minutes')
    const [showDomainDropdown, setShowDomainDropdown] = useState(false)
    const [selectedDomains, setSelectedDomains] = useState(new Set(['ippoChennai', 'ippoVirudhunagar']))

    const domains = [
        {
            id: "ippoChennai",
            name: "ippoChennai",
            icon: <IoGlobeOutline fontSize={18} color="#777" />,
        },
        {
            id: "ippoMadurai",
            name: "ippoMadurai",
            icon: <IoTerminalOutline fontSize={18} color="#777" />,
        },
        {
            id: "ippoVirudhunagar",
            name: "ippoVirudhunagar",
            icon: <IoSettingsOutline fontSize={18} color="#777" />,
        },
    ];

    const toggleDomainSelection = (domainId) => {
        const newSelected = new Set(selectedDomains)
        if (newSelected.has(domainId)) {
            newSelected.delete(domainId)
        } else {
            newSelected.add(domainId)
        }
        setSelectedDomains(newSelected)
    }

    const [showActionDropdown, setShowActionDropdown] = useState(false)
    const [selectedAction, setSelectedAction] = useState('')
    const [callPhone, setCallPhone] = useState('')
    const [whatsappPhone, setWhatsappPhone] = useState('')
    const [whatsappMessage, setWhatsappMessage] = useState('')
    const [externalLink, setExternalLink] = useState('')

    const actionMethods = [
        { id: 'call', title: t('call'), description: t('talkInstantly'), icon: <IoCallSharp fontSize={20} color="#f0f0f0" /> },
        { id: 'whatsapp', title: t('whatsapp'), description: t('sendQuickMessage'), icon: <BsWhatsapp fontSize={18} color="#f0f0f0" /> },
        { id: 'link', title: t('externalLink'), description: t('visitMoreDetails'), icon: <MdOutlineOpenInNew fontSize={18} color="#f0f0f0" /> }
    ]

    const getSelectedAction = () => actionMethods.find(m => m.id === selectedAction)
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
                        <TitleInput type="text" placeholder={t('title')} />
                        <Divider />
                        <BodyInput placeholder={t('provideContent')} />
                    </ContentArea>

                    <Toolbar>
                        <ToolButton title={t('addImage')}>
                            <MdInsertPhoto fontSize={30} color="white" />
                        </ToolButton>
                        <ToolButton title={t('attachFile')}>
                            <IoMdAttach fontSize={30} />
                        </ToolButton>
                        <DraftStatus>
                            {t('draftSaved')}
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
                        <ToggleTrack $on={on} onClick={() => setOn(v => !v)}>
                            <ToggleThumb $on={on} />
                        </ToggleTrack>
                    </Banner>
                    <BorderLine />
                    <PeriodSection>
                        <PeriodLabel>{t('selectPeriod')}</PeriodLabel>
                        <CounterRow>
                            <CountBtn onClick={() => setCount(v => Math.max(1, v - 1))}>−</CountBtn>
                            <CountValue>{count}</CountValue>
                            <CountAddBtn onClick={() => setCount(v => v + 1)}>+</CountAddBtn>
                        </CounterRow>
                        {/* <UnitRow>
                            <UnitText>Minutes</UnitText>
                            <ChevronIcon />
                        </UnitRow> */}
                        <UnitRow>
                            <Select
                                value={selected}
                                onChange={(e) => setSelected(e.target.value)}
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
                            <InfoValue>{t('todayTime')}</InfoValue>
                            <InfoSub>{t('startsFromPublished')}</InfoSub>
                        </InfoCard>

                        <InfoCard>
                            <InfoHeader>
                                <CreditIcon />
                                <InfoLabel>{t('credits')}</InfoLabel>
                            </InfoHeader>
                            <InfoValue>120.00</InfoValue>
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
                            <DomainInput type="text" placeholder={t('searchDomains')} />
                        </DomainSearch>
                        {showDomainDropdown && (
                            <DomainList>
                                {domains.map(domain => (
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
                <PublishButton>{t('publish')}</PublishButton>
            </CreatePostWrapper>
        </>
    );
};

export default CreatePost;