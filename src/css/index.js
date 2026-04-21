import styled from '@emotion/styled'
import { keyframes, createGlobalStyle } from "styled-components";
// breakpoints.js
export const responsive = {
  xsmall: '@media (max-width: 320px)',
  small: '@media (min-width: 321px) and (max-width: 424px)',
  medium: '@media (min-width: 425px) and (max-width: 767px)',
  tablet: '@media (min-width: 768px) and (max-width: 1023px)',
  desktop: '@media (min-width: 1024px)',
};

// Media Queries
// const mobile = '@media (max-width: 480px)';
// const tablet = '@media (max-width: 768px)';

// ── Theme toggle ──────────────────────────────────────────────────────────────

export const ThemeToggle = styled.button`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 100;
  padding: 6px 14px;
  border-radius: 20px;
  border: 2px solid var(--accent-border);
  background: var(--accent-bg);
  color: var(--text-h);
  font-family: var(--sans);
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    background: var(--accent-border);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`

// ── Navbar ───────────────────────────────────────────────────────────────────

export const NavShell = styled.header`
  width: 100%;
  padding: 0;
  background: var(--nav-bg);
  color: var(--nav-text);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $show }) => ($show ? 'translateY(0)' : 'translateY(-100%)')};
`;

export const NavbarWrap = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
//   justify-content: space-between;
  gap: 16px;
  padding: 8px 16px;
//   background: var(--nav-bg);
  background:#191C1D;
  border-top: 1px solid var(--surface-border);
  border-bottom: 1px solid var(--surface-border);
  box-shadow: inset 0 -10px 18px rgba(0, 0, 0, 0.08);
`

export const MenuButton = styled.button`
  width: 50px;
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
//   color: var(--nav-text);
    color:#ffffff;
  cursor: pointer;

  svg {
    width: 28px;
    height: 28px;
  }
`

export const BrandTitle = styled.h1`
  margin: 0;
  font-family: 'Lilita One', cursive;
  font-size: 24px;
  font-weight: 400;
  font-style: normal;
  line-height: 100%;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #ffca22;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;


// ------------Login Page Styles-------------------

export const PageWrapper = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;

  @media (min-width: 769px) {
    flex-direction: row;
    align-items: stretch;
  }
`;

export const BackgroundPanel = styled.section`
  flex: 1;
  // padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  color: white;
  background: #000000;
  min-height: 300px;
  text-align: center;

  @media (min-width: 769px) {
    min-height: 100vh;
  }
`;

export const Logo = styled.span`
  display: inline-block;
  font-family: 'Lilita One', cursive;
  font-size: 48px;
  font-weight: 400;
  font-style: normal;
  line-height: 100%;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #FFC201;
  padding:12px;
`;

export const Headline = styled.h1`
  margin: 0;
  font-family: 'Maven Pro', sans-serif;
  font-size: 48px;
  font-weight: 700;
  font-style: normal;
  line-height: 60px;
  letter-spacing: -2.4px;
  vertical-align: middle;
  color: #ffffff;
  padding:12px;
  text-align: start;
`;


export const LoginCard = styled.section`
  background: #ffffff;
  // border-radius: 32px 32px 0 0;
  padding: 36px 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: -32px;
  box-shadow: 0 -10px 25px rgba(0,0,0,0.05);

  @media (min-width: 769px) {
    margin-top: 0;
    border-radius: 0;
    width: 450px;
    flex-shrink: 0;
    justify-content: center;
    box-shadow: -10px 0 25px rgba(0,0,0,0.05);
  }
`;

export const CardHeader = styled.h2`
  margin: 0;
  font-family: 'Maven Pro', sans-serif;
  font-size: 30px;
  font-weight: 800;
  font-style: normal;
  line-height: 36px;
  letter-spacing: -0.75px;
  vertical-align: middle;
  color: #111111;
`;


export const CardSubTitle = styled.p`
  margin: -12px 0 0;
  font-family: 'Maven Pro', sans-serif;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  line-height: 24px;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #888888;
  padding-bottom: 30px;
`;

export const PhoneNumber = styled.p`
  // margin: -12px 0 0;
  margin: 10px 0px 0px 0px;
  font-family: 'Maven Pro', sans-serif;
  font-size: 10px;
  font-weight: 500;
  font-style: normal;
  line-height: 24px;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #888888;
`;

export const PhoneInputGroup = styled.div`
  display: flex;
  align-items: center;
  background: #E7E8E9;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e8e8e8;
  padding:10px;
`;

export const CountryCode = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-right: 1px solid #e0e0e0;
`;
export const DropdownIcon = styled.span`
  font-size: 14px;
  color: #888888;
  line-height: 1;
  margin-top: 5px;
  gap:8px;
`;

export const Code = styled.span`
  font-family: 'Maven Pro', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #111111;
`;

export const PhoneInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  color: #111111;
  outline: none;
  padding: 14px 16px;

  &::placeholder {
    font-family: 'Maven Pro', sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0px;
    color: #888888; /* adjust if needed */
  }
`;

export const Button = styled.button`
  width: 100%;
  max-width: 400px;
  height: 60px;
  border: none;
  border-radius: 16px;
  background: #111111;
  color: #ffffff;
  cursor: pointer;
  align-self: center;
  margin-top: 10px;

  box-shadow: 0px 8px 10px -6px #0000000D, 0px 20px 25px -5px #0000000D;

  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.45px;
  text-align: center;
  vertical-align: middle;

  &:hover {
    opacity: 0.85;
  }

  &:active {
    opacity: 0.7;
  }
`;

export const OtpWrapper = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  margin: 8px 0;
`;

export const PageWrappers = styled.main`
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    background: #0a0a0a;
    color: #ffffff;
    border-radius:20px;
    padding:40px 10px;
    margin-top:35px;
`;

export const TopBar = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 18px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
`;

export const TopLogo = styled.span`
    font-size: 1.2rem;
    font-weight: 800;
    color: #ffc400;
`;

export const ImageSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    // padding: 32px 20px 24px;
    gap: 8px;
`;

export const AvatarWrapper = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    margin-bottom: 8px;
`;

export const Avatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    background: var(--surface);
`;

export const CameraButton = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--surface);
    border: 2px solid var(--surface-border);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const ProfileImageTitle = styled.p`
  margin: 0;
  font-family: 'Manrope', sans-serif;
  font-size: 18px;
  font-weight: bold;
  font-style: normal;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: center;
  vertical-align: middle;
  color: #ffffff;
`;


export const ProfileImageSubtitle = styled.p`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: center;
  vertical-align: middle;
  color: #888888;
  max-width: 260px;
`;


export const ChangePhotoText = styled.span`
    font-size:14px;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
`;

export const FormSection = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    gap: 8px;
    flex: 1;
`;

export const FieldLabel = styled.label`
  font-family: 'Maven Pro', sans-serif;
  font-size: 12px;
  font-weight: 700;
  font-style: normal;
  line-height: 16px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  vertical-align: middle;
  color: #ffffff;
  margin-top: 8px;
  text-align: left;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const DropdownContainer = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  z-index: 10;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
`;

export const DropdownHeader = styled.div`
  font-size: 11px;
  color: #666;
  padding: 8px 12px 5px;
  border-bottom: 1px solid #2a2a2a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const SuggestionItem = styled.div`
  padding: 10px 12px;
  font-size: 14px;
  cursor: pointer;
  color: #e0e0e0;
  transition: background 0.15s;

  &:hover {
    background: #2a2a2a;
    color: #fff;
  }
`;
export const FieldInput = styled.input`
    background: #191c1c;
    border: 1px solid #2f3336;
    border-radius: 10px;
    padding: 18px 16px;
    font-size: 0.95rem;
    color: #ffffff;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    margin-left:5px;
    &::placeholder {
        color: #888888;
        font-weight:400;
        font-size:16px;
    }

    &:focus {
        border-color: #ffffff;
    }
`;

export const DateWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

export const DateInput = styled(FieldInput)`
    padding-right: 44px;

    &::-webkit-calendar-picker-indicator {
        opacity: 0;
        position: absolute;
        right: 0;
        width: 44px;
        height: 100%;
        cursor: pointer;
    }
`;

export const CalendarIcon = styled.div`
    position: absolute;
    right: 14px;
    pointer-events: none;
`;

export const ContinueButton = styled.button`
    width: calc(100% - 40px);
    margin: 24px 20px;
    height: 68px;
    border: none;
    border-radius: 10px;
    background: #111111;
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0px 8px 10px -6px rgba(0,0,0,0.15), 0px 20px 25px -5px rgba(0,0,0,0.12);

    &:hover {
        opacity: 0.85;
    }
`;

export const OtpInput = styled.input`
  width: 45px;
  height: 45px;
  border-radius: 9px;
  border: 1px solid #e0e0e0;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
  color: #111111;
  outline: none;
  background: #f8f9fa;

  @media (min-width: 375px) {
    width: 55px;
    height: 55px;
    font-size: 1.5rem;
  }

  &:focus {
    border-color: #111111;
    background: #ffffff;
    box-shadow: 0 0 0 2px rgba(17, 17, 17, 0.05);
  }
`;
export const LangToggle = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const LangBtn = styled.button`
  border: 1px solid ${({ active }) => (active ? '#111111' : '#e0e0e0')};
  background: ${({ active }) => (active ? '#111111' : 'transparent')};
  color: ${({ active }) => (active ? '#ffffff' : '#888888')};
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
`;

export const ErrorText = styled.span`
    font-size: 0.78rem;
    color: #ff4d4d;
    margin-top: -4px;
    text-align: left;
`;


// ---------------Feed Page-------------------

export const FeedPageWrapper = styled.div`
    background-color: var(--bg);
    min-height: 100vh;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: var(--text);
`;

export const FeedContainer = styled.main`
    max-width: 500px;
    margin: 0 auto;
    padding: 0;
`;

export const FeedPost = styled.article`
    border-bottom: 1px solid var(--surface-border);
    // margin-bottom: 20px;
    background: var(--surface);
`;

export const PostHeader = styled.header`
    display: flex;
    align-items: center;
    padding: 12px 16px;
    position: relative;
    gap:12px;
`;

export const UserAvatar = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 12px;
    border: 1px solid var(--surface-border);
`;
export const UserAvatarFallback = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #2a2a2e;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 16px;
`;
export const UserInfo = styled.div``;

export const UserName = styled.h3`
  margin: 0;
  font-family: 'Maven Pro', sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  line-height: 100%;
  letter-spacing: 0px;
  vertical-align: middle;
  color: var(--text);
`;


export const UserLocation = styled.p`
  margin: 0;
  font-family: 'Maven Pro', sans-serif;
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  line-height: 100%;
  letter-spacing: 0px;
  vertical-align: middle;
  color: var(--text-muted);
  text-align:justify;
`;


export const MoreOptions = styled.button`
    position: absolute;
    right: 16px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: var(--text);
    display:none;
    &::after {
        content: '⋮';
    }
`;

export const PostImage = styled.img`
    width: 100%;
    aspect-ratio: 1 / 1.25;
    object-fit: cover;
    display: block;
`;

export const CarouselDots = styled.div`
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
    z-index: 10;
`;

export const Dot = styled.span`
    width: 7px;
    height: 7px;
    background-color: ${({ active }) => (active ? '#fff' : 'rgba(255,255,255,0.6)')};
    border-radius: 50%;
`;

export const PostContent = styled.div`
    padding: 16px;
    color: var(--text);
`;

export const PostCaption = styled.div`
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 8px;
    text-align:left;
    color: var(--text);
`;

export const CaptionUser = styled.span`
  font-family: 'Maven Pro', sans-serif;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  line-height: 20px;
  letter-spacing: 0px;
  margin-right: 8px;
  color: var(--text);
`;


export const CaptionText = styled.span`
  font-family: 'Maven Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 20px;
  letter-spacing: 0px;
  color: var(--text);
  overflow-wrap: anywhere;
  word-break: break-word;
`;


export const PostTime = styled.p`
    font-size: 12px;
    color: var(--text-muted);
    margin-bottom: 20px;
    text-align:left;
`;

export const EnquiryButton = styled.button`
    width: 380px;
    background-color: var(--button-bg);
    color: var(--button-text);
    border: none;
    padding: 25px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-bottom: 16px;

    &:hover {
        opacity: 0.9;
    }
`;

export const PublishButton = styled.button`
    width: 380px;
    margin-top: 30px;
    background-color: var(--button-bg);
    // background:black;
    color: var(--button-text);
    border: none;
    padding: 25px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-bottom: 16px;

    &:hover {
        opacity: 0.9;
    }
`;

export const PostFooter = styled.footer`
  font-family: 'Maven Pro', sans-serif;
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: center;
  vertical-align: middle;
  border-top: 1px solid var(--surface-border);
  padding-top: 12px;
  color: var(--text);
  display:flex;
`;


export const CommentsSection = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
    color: var(--text);
    font-size: 14px;
    font-weight: 500;
`;

export const CommentIcon = styled.span`
    opacity: 0.7;
    display: flex;
    align-items: center;
`;

export const CommentsCount = styled.span`
font-family: 'Maven Pro', sans-serif;
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: center;
  vertical-align: middle;
  color: var(--text);
`;
// --------Feed Detail------------

export const HeroImage = styled.img`
    width: 100%;
    height: 60vh;
    object-fit: cover;
    display: block;
`;

export const BackButton = styled.button`
    position: absolute;
    top: 16px;
    left: 16px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: black;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
`;

export const OverlayContent = styled.div`
    position: relative;
    background: var(--surface-strong);
    color: var(--text);
    // border-top-left-radius: 32px;
    // border-top-right-radius: 32px;
    padding: 35px 18px 22px;
    margin-top: 0px;
    box-shadow: 0 -20px 40px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

export const UserRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    // visibility: hidden;
`;

export const DetailAvatar = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--surface-border);
`;

export const DetailUserInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const DetailUserName = styled.span`
    font-size: 0.95rem;
    font-weight: 700;
    color: inherit;
    text-align:left;
`;

export const DetailUserLocation = styled.span`
    font-size: 0.78rem;
    color: inherit;
    opacity: 0.75;
    text-align:left;
`;

export const DetailCaption = styled.p`
    margin: 0;
    font-size: 0.95rem;
    color: inherit;
    line-height: 1.6;
    text-align:left;
`;

export const DetailTime = styled.span`
    font-size: 0.75rem;
    color: inherit;
    opacity: 0.65;
    text-align:left;
`;

export const DetailEnquiryButton = styled.button`
    width: 100%;
    height: 62px;
    border: none;
    border-radius: 14px;
    background: var(--button-bg);
    color: var(--button-text);
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    margin-top: 4px;

    &:hover {
        opacity: 0.9;
    }
`;

export const DetailFooter = styled.div`
    border-top: 1px solid var(--surface-border);
    padding-top: 12px;
`;

export const LastSlideBar = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 12px 16px 20px;
    background: transparent;
    z-index: 20;
`;

export const LastSlideButton = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #111111;
    border: none;
    border-radius: 16px;
    padding: 18px 20px;
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
`;

export const LastSlideLabel = styled.span`
    color: inherit;
`;

export const LastSlideIcon = styled.span`
    font-size: 24px;
    line-height: 0;
    color: inherit;
`;

export const DetailCommentsSection = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const DetailCommentIcon = styled.span`
    opacity: 0.7;
    display: flex;
    align-items: center;
    color: var(--text);
`;

export const DetailCommentsCount = styled.span`
    font-size: 0.85rem;
    color: var(--text);
`;

export const PostMedia = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    overflow: hidden;
    background: var(--button-bg);
`;

export const SlideActionButton = styled.button`
    position: absolute;
    left: 50%;
    width:100%;
    bottom: 0px;
    transform: translateX(-50%);
    background:black;
    color: #fff;
    border: none;
    padding: 16px 18px;
    font-weight: 600;
    font-size: 14px;
    text-align:start;
    cursor: pointer;
    z-index: 50;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.35);
    transition: opacity 0.2s ease;

    &:hover {
        opacity: 0.92;
    }
`;

export const DetailSlideActionButton = styled.button`
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    bottom: 0;
    transform: none;
    background: #111111;
    color: #ffffff;
    border: none;
    padding: 14px 14px;
    font-weight: 700;
    font-size: 15px;
    text-align: center;
    cursor: pointer;
    z-index: 55;
    box-shadow: 0 18px 34px rgba(0, 0, 0, 0.35);
`;
export const DetailWrapper = styled.div`
    min-height: 100vh;
    background: var(--bg);
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const DetailSliderTrack = styled.div`
    display: flex;
    transition: transform 0.3s ease;
    transform: ${({ activeSlide }) => `translateX(-${activeSlide * 100}%)`};
    width: 100%;
    flex-shrink: 0;
`;

export const DetailSliderImage = styled.img`
    min-width: 100%;
    width: 100%;
    height: 60vh;
    object-fit: cover;
    display: block;
    flex-shrink: 0;
`;

export const DetailCarouselDots = styled.div`
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
    z-index: 10;
`;

export const DetailDot = styled.span`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ active }) => (active ? '#fff' : 'rgba(255,255,255,0.5)')};
    cursor: pointer;
`;
export const SliderTrack = styled.div`
    display: flex;
    align-items: center;
    transition: transform 0.3s ease;
    transform: ${({ activeSlide }) => `translateX(-${activeSlide * 100}%)`};
    background:var(--space-bg)
`;

export const SliderImage = styled.img`
    min-width: 100%;
    width: 100%;
    height: auto;
    display: block;
    flex-shrink: 0;
`;

export const Overlay = styled.div`
    display: ${({ open }) => (open ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    background: blur;
    z-index: 998;
`;

// export const Drawer = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     height: 100vh;
//     width: 75%;
//     max-width: 280px;
//     background: white;
//     z-index: 999;
//     transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
//     transition: transform 0.3s ease;
//     display: flex;
//     flex-direction: column;
//     padding: 20px 16px;
//     box-sizing: border-box;
//     border-right: 1px solid #2e303a;
// `;

// export const DrawerHeader = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin-bottom: 24px;
//     padding-bottom: 16px;
//     border-bottom: 1px solid #2e303a;
//     background: white;
// `;
export const Drawer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 295px;
  background: #ffffff;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease;
  overflow: hidden;        /* no outer padding/gap */
`;

export const DrawerHeader = styled.div`
  width: 100%;
  background: linear-gradient(91.36deg, #191C1D 1.16%, #000000 186.57%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  margin: 0;              
  flex-shrink: 0;      
  box-sizing: border-box;
`;

export const DrawerMenu = styled.div`
  flex: 1;
  background: #ffffff;  
  overflow-y: auto;
  padding: 12px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DrawerLogo = styled.span`
    font-family: 'Lilita One', cursive;
    font-size: 20px;
    font-weight: 400;
    color: #ffca22;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 4px;
`;

// export const DrawerMenu = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
// `;


export const DrawerItem = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 14px;
    border-radius: 10px;
    background: ${({ active }) => (active ? '#020617' : 'transparent')};
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        background: ${({ active }) => (active ? '#2e303a' : '#262829')};
    }
`;

export const DrawerIcon = styled.span`
    display: flex;
    align-items: center;
    color: ${({ active }) => (active ? '#f3f4f6' : '#9ca3af')};
    transition: color 0.2s ease;
`;

// export const DrawerLabel = styled.span`
//     font-size: 0.95rem;
//     font-weight: 600;
//     color: ${({ active }) => (active ? '#f3f4f6' : '#9ca3af')};
//     transition: color 0.2s ease;
// `;
export const DrawerLabel = styled.span`
    font-family: 'Maven Pro', sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    
    color: ${({ active }) => (active ? '#f3f4f6' : '#9ca3af')};
    transition: color 0.2s ease;
`;

export const TextContentBox = styled.div`
    background: var(--surface);
    border-left: 5px solid orange;
    margin: 0 0 4px 0;
    padding: 20px 16px;
    min-height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;
`;

export const TextContentBody = styled.p`
    margin: 0;
    font-size: 0.95rem;
    color: inherit;
    line-height: 1.7;
    white-space: pre-wrap;
    text-align: left;
`;
export const TextContentTitle = styled.p`
    margin: 0;
    font-family: 'Gotham', sans-serif;
    font-weight: 700;
    font-size: 24px;
    line-height: 28.8px;
    letter-spacing: -0.6px;
    color: inherit;
    vertical-align: middle;
    white-space: pre-wrap;
    text-align: left;
`;


export const ReadMoreButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    font-size: 0.88rem;
    font-weight: 700;
    color: #ffc400;
    cursor: pointer;
    text-align: left;
`;

export const DetailTextBox = styled.div`
    background: #1a1a1a;
    border-left: 4px solid #ffc400;
    padding: 32px 20px;
    min-height: 220px;
    font-size: 1rem;
    color: #ffffff;
    line-height: 1.8;
    white-space: pre-wrap;
`;

export const DetailReadMoreButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    font-size: 0.9rem;
    font-weight: 700;
    color: #ffc400;
    cursor: pointer;
`;

export const VideoWrapper = styled.div`
    width: 100%;
    background: #000000;
`;

export const PostVideo = styled.video`
    width: 100%;
    aspect-ratio: 16 / 9;
    display: block;
    object-fit: cover;
`;

export const ThemeToggleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: none;
  background: transparent;
  color: #9ca3af;
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: 'Maven Pro', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1;

  &:hover {
    background: #262829;
    color: #f3f4f6;
  }
  &:focus-visible {
    outline: 2px solid #c084fc;
    outline-offset: -2px;
  }
`

export const DrawerFooter = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 18px 16px 24px;
  background: transparent;
  box-sizing: border-box;
`;

export const DrawerLanguageSection = styled.div`
  display: flex;
  flex-direction:row;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 16px;
  background: #111318;
  border: 1px solid #262a32;
  justify-content: space-between;
`;

export const DrawerLanguageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const DrawerLanguageLabel = styled.span`
  font-family: 'Maven Pro', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

export const DrawerLanguageSubtitle = styled.span`
  font-family: 'Maven Pro', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #8a93a7;
`;

// export const DrawerLanguageButtons = styled.div`
//   display: flex;
//   gap: 10px;
// `;

// export const DrawerLanguageButton = styled.button`
//   min-width: 72px;
//   padding: 12px 16px;
//   border-radius: 16px;
//   border: none;
//   background: ${({ active }) => (active ? '#1a3cff' : '#1f242e')};
//   color: ${({ active }) => (active ? '#ffffff' : '#9aa1b9')};
//   font-family: 'Maven Pro', sans-serif;
//   font-size: 13px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: background 0.2s ease, color 0.2s ease;
// `;
export const DrawerLanguageButtons = styled.div`
  display: inline-flex;
  background: #1f242e;
  border-radius: 20px;
  padding: 3px;
  gap: 0;
`;

export const DrawerLanguageButton = styled.button`
  min-width: 56px;
  padding: 6px 14px;
  border-radius: 16px;
  border: none;
  background: ${({ active }) => (active ? '#ffffff' : 'transparent')};
  color: ${({ active }) => (active ? '#1a1a2e' : '#9aa1b9')};
  font-family: 'Maven Pro', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
`;
export const DrawerThemeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 16px;
  border-radius: 16px;
  background: #111318;
  border: 1px solid #262a32;
  cursor: pointer;
`;

export const DrawerThemeSubtitle = styled.span`
  font-family: 'Maven Pro', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #8a93a7;
`;

export const DrawerLanguageIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #666666;
  font-size: 14px;
`;

export const DrawerThemeLabel = styled.span`
  font-family: 'Maven Pro', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
`;

export const ToggleSwitch = styled.button`
  position: relative;
  width: 44px;
  height: 24px;
  border: none;
  border-radius: 12px;
  background: ${({ isEnabled }) => (isEnabled ? '#4f46e5' : '#d1d5db')};
  cursor: pointer;
  transition: background 0.3s ease;
  padding: 0;
  display: flex;
  align-items: center;
  padding: 2px;

  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 10px;
    transition: transform 0.3s ease;
    transform: translateX(${({ isEnabled }) => (isEnabled ? '20px' : '0')});
  }
`;

// ─── Feed Detail Page ──────────────────────────────────────────────────────

export const ActionBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const EnquiryBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  // background: var(--button-bg);
  color: var(--button-bg);
  border-radius: 20px;
  padding: 6px 12px;
  cursor: pointer;
`

export const EnquiryText = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: inherit;
`

export const IconButton = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 6px 10px;
`

export const CountText = styled.span`
  font-size: 15px;
  color: var(--text);
  font-weight: 700;
`
export const FeedDetailWrapper = styled.div`
    min-height: 100vh;
    background: #ffffff;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
`;

export const DetailBackButton = styled.button`
    position: absolute;
    top: 20px;
    left: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #111111;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 20;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
`;

export const OverlayContentClassic = styled.div`
    flex: 1;
    background: #1e1e1e;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #ffffff;
`;

export const TextHeader = styled.div`
    padding: 80px 24px 340px 24px;
    flex: 1;
    overflow-y: auto;
    background: #ffffff;
`;

export const DetailTitle = styled.h1`
    font-size: 28px;
    font-weight: 800;
    color: #111111;
    margin-bottom: 20px;
    line-height: 1.2;
`;

export const DetailTextCaption = styled.div`
    font-size: 16px;
    color: #222222;
    line-height: 1.6;
    font-weight: 500;
    white-space: pre-wrap;
    margin-bottom: 24px;
`;

export const FixedFooter = styled.div`
    background: #333333;
    padding: 24px;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
    z-index: 10;
`;

export const DetailUserRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const DetailDetailAvatar = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
`;

export const DetailDetailUserInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const DetailDetailUserName = styled.span`
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
`;

export const DetailDetailUserLocation = styled.span`
    font-size: 13px;
    color: #aaaaaa;
    margin-top: 2px;
`;

export const DetailDetailTime = styled.span`
    font-size: 12px;
    color: #888888;
    margin-top: 4px;
`;

export const EnquiryButtonTextPost = styled.button`
    width: 100%;
    height: 64px;
    border: none;
    border-radius: 12px;
    background: #ffffff;
    color: #111111;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 8px;

    &:hover {
        background: #f0f0f0;
    }
`;

export const ClassicEnquiryButton = styled(EnquiryButtonTextPost)`
    background: #ffffff;
    color: #111111;
`;

export const FooterBottom = styled.div`
    display: flex;
    align-items: center;
    margin-top: 8px;
    gap: 8px;
`;

export const CommentIconRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #aaaaaa;
    font-size: 14px;
    font-weight: 500;
`;


// ------Create Feed-------
// css/index.js (add these)

export const CenterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top:30px;
`
export const CardWrapper = styled.div`
  // background: url('/src/assets/CreateFeed.png') center/cover no-repeat;
  background:black;
  border-radius: 16px;
  padding: 24px 20px;
  width: 342px;
  height:auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CreateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const IconBox = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const CardTitle = styled.h2`
  font-family: 'Maven Pro', sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0px;
  vertical-align: middle;
  
  color: #ffffff;
  margin: 0;
`;


export const CardDescription = styled.p`
  font-family: 'Maven Pro', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0px;
  vertical-align: middle;

  color: rgba(255, 255, 255, 0.6);
  margin: 0;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
`;
export const CreateButton = styled.button`
  background: #ffffff;
  color: #111111;
  border: none;
  border-radius: 10px;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  width: 278px;
  line-height: 24px;
  cursor: pointer;
  height:56px;
  margin-top: 4px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
    transform: scale(0.98);
  }
`;



// ------- Create Post --------

// --- Animations ---

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 20px;
  position: relative;
  border-bottom: 1px solid #e8e8e8;
  margin-top: 20px;
  background: transparent;

  html[data-theme='dark'] & {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background: #0b0c0d;
  }
`

export const CreatePostBackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--text);
  transition: background 0.15s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  html[data-theme='dark'] & {
    color: #fff;
  }
`

export const HeaderTitle = styled.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  font-family: 'Maven Pro', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0;

  color: var(--text);

  html[data-theme='dark'] & {
    color: #fff;
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.35);
  }
`;

// export const CreatePostWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     width: 100%;
//     margin-top:20px;
// `
export const CreatePostWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    // padding: 0 16px;        

    @media (max-width: 320px) {
        margin-top: 12px;
        padding: 0 10px;
    }

    @media (min-width: 321px) and (max-width: 424px) {
        margin-top: 16px;
        padding: 0 14px;
    }

    @media (min-width: 425px) and (max-width: 767px) {
        margin-top: 18px;
        // padding: 0 16px;
    }

    @media (min-width: 768px) and (max-width: 1023px) {
        max-width: 640px;
        margin: 24px auto 0;
        padding: 0 24px;
    }

    @media (min-width: 1024px) {
        max-width: 800px;
        margin: 30px auto 0;
        padding: 0;
    }
`;
export const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`;

// --- Styled Components ---
// export const PhoneFrame = styled.div`
//   width: 380px;
//   background: #0F1011;
//   border-radius: 24px;
//   overflow: hidden;
//   border: 1px solid #222;
//   font-family: "Sora", sans-serif;
//   html[data-theme='dark'] & {
//     box-shadow: 0 42px 90px rgba(0, 0, 0, 0.72), 0 12px 28px rgba(0, 0, 0, 0.35);
//   }
// `;
export const PhoneFrame = styled.div`
    width: 380px;
    background: #0F1011;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid #222;
    font-family: "Sora", sans-serif;

    html[data-theme='dark'] & {
        box-shadow: 0 42px 90px rgba(0, 0, 0, 0.72), 0 12px 28px rgba(0, 0, 0, 0.35);
    }

    /* Small phones — iPhone SE (320px) */
    @media (max-width: 320px) {
        width: 100%;
        border-radius: 0;
        border-left: none;
        border-right: none;
    }

    /* Medium phones (321px–424px) */
    @media (min-width: 321px) and (max-width: 424px) {
        width: 100%;
        border-radius: 16px;
    }

    /* Large phones (425px–767px) */
    @media (min-width: 425px) and (max-width: 767px) {
        width: 100%;
        max-width: 400px;
        border-radius: 20px;
    }

    /* Tablets (768px–1023px) */
    @media (min-width: 768px) and (max-width: 1023px) {
        width: 380px;
        border-radius: 24px;
    }

    /* Laptops and above (1024px+) */
    @media (min-width: 1024px) {
        width: 380px;
        border-radius: 24px;
    }
`;
export const ContentArea = styled.div`
  padding: 20px 20px 0;
  min-height: 340px;
`;

export const TitleInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;

  font-family: 'Maven Pro', sans-serif;
  font-weight: 600;
  font-size: 36px;
  line-height: 20px;
  letter-spacing: 0;
  vertical-align: middle;

  color: #ffffff;
  margin-bottom: 18px;
  caret-color: #5b8dee;

  &::placeholder {
    color: #6f6f75;
  }
`;


export const Divider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, #2a2a2e 0%, transparent 100%);
  margin-bottom: 18px;
`;

export const BodyInput = styled.textarea`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;

  font-family: 'Maven Pro', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 32.5px;
  letter-spacing: 0;
  vertical-align: middle;

  color: #d9d9d9;
  resize: none;
  min-height: 220px;
  caret-color: #5b8dee;

  &::placeholder {
    color: #6f6f75;
  }
`;


export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 20px;
  border-top: 1px solid #1e1e20;
  gap: 4px;
`;

export const ToolButton = styled.button`
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s, background 0.15s;

  &:hover {
    color: #aaa;
    background: #1e1e22;
  }
`;

export const DraftStatus = styled.button`
  // margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content:center;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 10px;
  line-height: 15px;
  letter-spacing: 1px;
  vertical-align: middle;
  text-transform: uppercase;
  background: none;
  border:none;
  color: #444;
`;


export const PulseDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2ecc71;
  box-shadow: 0 0 6px #2ecc71aa;
  animation: ${pulse} 2.5s ease-in-out infinite;
`;

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`

// export const Card = styled.div`
//   width: 380px;
//   background: #0F1011;
//   border-radius: 28px;
//   overflow: hidden;
//   font-family: 'Sora', sans-serif;
//   animation: ${fadeIn} 0.3s ease;
//   border: 1px solid #1e1e22;
//   margin-top:20px;
//   html[data-theme='dark'] & {
//     box-shadow: 0 28px 60px rgba(0, 0, 0, 0.72), 0 12px 30px rgba(0, 0, 0, 0.42);
//   }
// `
export const Card = styled.div`
    width: 380px;
    background: #0F1011;
    border-radius: 28px;
    overflow: hidden;
    font-family: 'Sora', sans-serif;
    animation: ${fadeIn} 0.3s ease;
    border: 1px solid #1e1e22;
    margin-top: 20px;

    html[data-theme='dark'] & {
        box-shadow: 0 28px 60px rgba(0, 0, 0, 0.72), 0 12px 30px rgba(0, 0, 0, 0.42);
    }

    ${responsive.xsmall} {
        width: 100%;
        border-radius: 0;
        border-left: none;
        border-right: none;
        margin-top: 12px;
    }

    ${responsive.small} {
        width: 100%;
        border-radius: 18px;
        margin-top: 14px;
    }

   ${responsive.medium} {
    width: 100%;
    max-width: 400px;
    border-radius: 20px;
    margin-top: 16px;
}

    ${responsive.tablet} {
        width: 380px;
        border-radius: 26px;
        margin-top: 18px;
    }

    ${responsive.desktop} {
        width: 380px;
        border-radius: 28px;
        margin-top: 20px;
    }
`;

export const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 16px;
  border-bottom: 1px solid #1e1e22;
`

export const BannerLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const RocketBadge = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #f5c518;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  flex-shrink: 0;
`

export const BannerInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`

export const BannerTitle = styled.span`
  font-family: 'Maven Pro', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  vertical-align: middle;

  color: #f0f0f0;
`;


export const BannerSub = styled.span`
  font-family: 'Maven Pro', sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 100%;
  letter-spacing: 0;
  color: #555;
  margin-top: 2px;
`;


export const ToggleTrack = styled.div`
  width: 42px;
  height: 24px;
  border-radius: 12px;
  background: ${({ $on }) => ($on ? '#4a90e2' : '#D9D9D9')};
  position: relative;
  cursor: pointer;
  transition: background 0.25s;
  flex-shrink: 0;
`

export const ToggleThumb = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  top: 3px;
  left: ${({ $on }) => ($on ? '21px' : '3px')};
  transition: left 0.25s;
`

export const PeriodSection = styled.div`
  padding: 18px 20px 10px;
`

export const PeriodLabel = styled.p`
  font-family: 'Maven Pro', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 15px;
  letter-spacing: 3px;
  text-align: center;
  vertical-align: middle;
  text-transform: capitalize;

  color: #FFFFFF;
  margin: 0 0 16px;
`;



export const CounterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
`

export const CountBtn = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: transparent;
  border: 1px solid #FFFFFF;
  color: #cccccc;
  font-size: 35px;
  font-weight: 300;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, transform 0.1s;
  line-height: 1;

  &:hover  { background: #252528; }
  &:active { transform: scale(0.93); }
`
export const CountAddBtn = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: white;
  border: 1px solid #FFFFFF;
  color: black;
  font-size: 35px;
  font-weight: 300;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, transform 0.1s;
  line-height: 1;

  // &:hover  { background: #252528; }
  // &:active { transform: scale(0.93); }
`

export const CountValue = styled.input`
  width: 90px;
  background: transparent;
  border: none;
  outline: none;
  text-align: center;
  font-size: 52px;
  font-weight: 700;
  color: #f0f0f0;
  letter-spacing: -0.03em;
  line-height: 1;
  appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const UnitRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 10px;
  padding-bottom: 16px;
  cursor: pointer;
`

export const UnitText = styled.span`
  font-family: 'Maven Pro', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  color: #FFFFFF;
`;


export const Grid = styled.div`
  display: flex;
  gap: 10px;
  padding: 0 14px 16px;
  justify-content: space-around;
  margin-top:20px;
`

export const InfoCard = styled.div`
  background: #000000;
  border-radius: 18px;
  padding:20px 10px;
  text-align:left;
  width:120px;
  html[data-theme='dark'] & {
    box-shadow: 0 22px 48px rgba(0, 0, 0, 0.58), 0 10px 24px rgba(0, 0, 0, 0.35);
  }
`
export const BorderLine = styled.div`
  width: 90%;
  margin-left:20px;
  margin-right:50px;
  height:1px;
  background: white;
`

export const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 8px;
  align-items: center;
`

export const InfoLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 10px;
  line-height: 15px;
  letter-spacing: 1px;
  vertical-align: middle;
  text-transform: uppercase;

  color: #FFFFFF;
`;


export const InfoValue = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
  text-align: left;
  color: #e8e8e8;
  margin-bottom: 5px;
`;


export const InfoSub = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  vertical-align: middle;

  color: #444;
`;

export const ChooseDomain = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
  margin-top:20px;
`;

export const DomainCard = styled.div`
  width: 380px;
  background: #0F1011;
  border-radius: 20px;
  border: 1px solid #1e1e22;
  padding: 15px 0px;
  margin-top: 20px;
  font-family: 'Sora', sans-serif;
  html[data-theme='dark'] & {
    box-shadow: 0 26px 72px rgba(0, 0, 0, 0.72), 0 12px 30px rgba(0, 0, 0, 0.40);
  }
`;

export const DomainHeader = styled.h3`
  margin: 0 0 14px;
  font-family: 'Maven Pro', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #f0f0f0;
`;

export const DomainSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  background: #111315;
  border: none;
  border-radius: 18px;
  padding: 12px 16px;
`;

export const SearchIcon = styled.div`
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
`;

export const DomainInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: #f0f0f0;
  font-family: 'Maven Pro', sans-serif;
  font-size: 14px;
  font-weight: 500;

  &::placeholder {
    color: #777;
  }
`;

export const TitleText = styled.div`
  font-family: 'Maven Pro', sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -1.5px;
  vertical-align: middle;
  color: #111111;

  html[data-theme='dark'] & {
    color: #f0f0f0;
  }
`;

export const DomainList = styled.div`
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  padding-top: 8px;
`;

export const DomainListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #1a1a1e;
  }

  // background: ${({ $isSelected }) => ($isSelected ? '#1a3a5c' : 'transparent')};
`;

export const DomainItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

export const DomainIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ $isSelected }) => ($isSelected ? '#2E5BFF' : '#2a2a2e')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 18px;
  color: white;
`;

export const DomainName = styled.span`
  font-family: 'Maven Pro', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #f0f0f0;
`;

export const DomainCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid ${({ $isSelected }) => ($isSelected ? '#4a90e2' : '#555')};
  background: ${({ $isSelected }) => ($isSelected ? '#4a90e2' : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 14px;
    height: 14px;
    color: white;
  }
`;

export const Action = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
  // margin-top:20px;
`;

export const ActionButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

export const ActionButtonLabel = styled.h3`
  margin: 0;
  font-family: 'Maven Pro', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #111111;

  html[data-theme='dark'] & {
    color: #f0f0f0;
  }
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

export const ActionButtonDropdown = styled.button`
  width: 380px;
  background: #0F1011;
  border: 1px solid #1e1e22;
  border-radius: 12px;
  padding: 25px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  html[data-theme='dark'] & {
    box-shadow: 0 26px 72px rgba(0, 0, 0, 0.72), 0 12px 30px rgba(0, 0, 0, 0.40);
  }

  font-family: 'Gotham', sans-serif;
  font-weight: 700; /* Bold */
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0px;
  vertical-align: middle;

  color: #f0f0f0;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    background: #151519;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #777;
    transition: transform 0.2s;
    transform: ${({ $isOpen }) =>
    $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;


export const ActionButtonList = styled.div`
  background: #0F1011;
  border: 1px solid #1e1e22;
  border-radius: 20px;
  overflow: hidden;
  animation: ${fadeIn} 0.2s ease;
`;

export const ActionButtonItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #1e1e22;
  cursor: pointer;
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #151519;
  }

  // background: ${({ $isSelected }) => ($isSelected ? '#1a3a5c' : 'transparent')};
`;

export const ActionButtonItemIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #2a2a2e;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 18px;
  margin-right: 12px;
`;

export const ActionButtonItemContent = styled.div`
  flex: 1;
  text-align: left;
`;

export const ActionButtonItemTitle = styled.div`
  font-family: 'Maven Pro', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #f0f0f0;
  margin-bottom: 2px;
`;

export const ActionButtonItemDescription = styled.div`
  font-family: 'Maven Pro', sans-serif;
  font-weight: 400;
  font-size: 11px;
  color: #777;
`;

export const ActionButtonItemCheckmark = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  // background: ${({ $isSelected }) => ($isSelected ? '#4a90e2' : 'transparent')};
  // border: 2px solid ${({ $isSelected }) => ($isSelected ? '#4a90e2' : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

export const ActionButtonContent = styled.div`
  background: #0F1011;
  border: 1px solid #1e1e22;
  border-radius: 20px;
  padding: 20px 25px;
  margin-top: 12px;
  font-family: 'Sora', sans-serif;
  width: 320px;
  html[data-theme='dark'] & {
    box-shadow: 0 26px 72px rgba(0, 0, 0, 0.72), 0 12px 30px rgba(0, 0, 0, 0.40);
  }
`;

export const ActionButtonHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 14px;
  border-bottom: 1px solid #1e1e22;
  margin-bottom: 14px;
`;

export const ActionButtonHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ActionButtonHeaderIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #2a2a2e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

export const ActionButtonHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ActionButtonHeaderTitle = styled.span`
  font-family: 'Maven Pro', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #f0f0f0;
`;

export const ActionButtonHeaderSubtitle = styled.span`
  font-family: 'Maven Pro', sans-serif;
  font-weight: 400;
  font-size: 11px;
  color: #777;
`;

export const ActionButtonHeaderChevron = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const ActionInputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ActionInputLabel = styled.label`
  font-family: 'Maven Pro', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #f0f0f0;
`;

export const ActionInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ActionPhonePrefix = styled.span`
  font-family: 'Maven Pro', sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #f0f0f0;
  background: #2a2a2e;
  padding: 10px 12px;
  border-radius: 10px;
  min-width: 50px;
  text-align: center;
`;

export const ActionInput = styled.input`
  flex: 1;
  background: #2a2a2e;
  border: none;
  outline: none;
  color: #f0f0f0;
  font-family: 'Maven Pro', sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 14px 12px;
  border-radius: 10px;

  &::placeholder {
    color: #555;
  }
`;

export const ActionTextarea = styled.textarea`
  background: #2a2a2e;
  border: none;
  outline: none;
  color: #f0f0f0;
  font-family: 'Maven Pro', sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 10px 12px;
  border-radius: 10px;
  resize: none;
  min-height: 80px;

  &::placeholder {
    color: #555;
  }
`;

export const ActionLinkInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ActionLinkIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #2a2a2e;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
  font-size: 16px;
`;


//Toaster

export const GlobalStyle = createGlobalStyle`
    /* existing styles... */

    .Toastify__toast {
        background: var(--bg) !important;
        border-radius: 14px !important;
        padding: 14px 16px !important;
        min-width: 300px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5) !important;
    }

    .Toastify__toast-body {
        padding: 0 !important;
        margin: 0 !important;
    }

    .Toastify__close-button {
        color: #666666 !important;
        opacity: 1 !important;
        align-self: center !important;
    }

    .Toastify__close-button:hover {
        color: #ffffff !important;
    }

    .Toastify__progress-bar {
        display: none !important;
    }
`;