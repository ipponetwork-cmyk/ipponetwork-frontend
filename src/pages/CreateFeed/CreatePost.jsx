import {
    PhoneFrame, ContentArea, CreatePostWrapper, TitleInput, Divider, BodyInput, Toolbar, ToolButton, DraftStatus, PulseDot, Header, CreatePostBackButton, HeaderTitle, Card,
    Banner, BannerLeft, RocketBadge, BannerInfo, BannerTitle, BannerSub,
    ToggleTrack, ToggleThumb,
    PeriodSection, PeriodLabel,
    CounterRow, CountBtn, CountValue,
    UnitRow, UnitText,
    Grid, InfoCard, InfoHeader, InfoLabel, InfoValue, InfoSub,
    CountAddBtn, BorderLine
} from '../../css/index';
import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { MdInsertPhoto } from "react-icons/md";
import { IoMdAttach } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { CiCalendar } from "react-icons/ci";


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
    const [on, setOn] = useState(false)
    const [count, setCount] = useState(60)
    const navigate = useNavigate();
    const [selected, setSelected] = useState('Minutes')
    return (
        <>

            <Header>
                <CreatePostBackButton onClick={() => navigate(-1)}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                </CreatePostBackButton>
                <HeaderTitle>Create Post</HeaderTitle>
            </Header>
            <CreatePostWrapper>
                <PhoneFrame>
                    <ContentArea>
                        <TitleInput type="text" placeholder="Title" />
                        <Divider />
                        <BodyInput placeholder="Provide the content" />
                    </ContentArea>

                    <Toolbar>
                        <ToolButton title="Add image">
                            <MdInsertPhoto fontSize={30} color="white" />
                        </ToolButton>
                        <ToolButton title="Attach file">
                            <IoMdAttach fontSize={30} />
                        </ToolButton>
                        <DraftStatus>
                            Draft Saved
                            <PulseDot />
                        </DraftStatus>
                    </Toolbar>
                </PhoneFrame>

                <Card>
                    <Banner>
                        <BannerLeft>
                            <RocketBadge>🚀</RocketBadge>
                            <BannerInfo>
                                <BannerTitle>Sponsor Post</BannerTitle>
                                <BannerSub>Boost your post visibility</BannerSub>
                            </BannerInfo>
                        </BannerLeft>
                        <ToggleTrack $on={on} onClick={() => setOn(v => !v)}>
                            <ToggleThumb $on={on} />
                        </ToggleTrack>
                    </Banner>
                    <BorderLine />
                    <PeriodSection>
                        <PeriodLabel>Select Period</PeriodLabel>
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
                                <InfoLabel>Ends In</InfoLabel>
                            </InfoHeader>
                            <InfoValue>Today, 5:00 PM</InfoValue>
                            <InfoSub>Starts from published time</InfoSub>
                        </InfoCard>

                        <InfoCard>
                            <InfoHeader>
                                <CreditIcon />
                                <InfoLabel>Credits</InfoLabel>
                            </InfoHeader>
                            <InfoValue>120.00</InfoValue>
                            <InfoSub>Total credits for this post</InfoSub>
                        </InfoCard>
                    </Grid>
                </Card>
            </CreatePostWrapper>
        </>
    );
};

export default CreatePost;