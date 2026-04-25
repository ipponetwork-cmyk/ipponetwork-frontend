import { useState, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoClose, IoLogOutOutline } from 'react-icons/io5';
import { GoHome } from 'react-icons/go';
import { CiCirclePlus } from "react-icons/ci";
import { MdLogin } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import useTheme from '../context/useTheme';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import {
  NavShell, NavbarWrap, MenuButton, BrandTitle, Overlay, Drawer,
  DrawerHeader, DrawerLogo, CloseButton, DrawerMenu, DrawerItem,
  DrawerIcon, DrawerLabel, DrawerFooter, DrawerLanguageSection,
  DrawerLanguageHeader, DrawerLanguageLabel, DrawerLanguageSubtitle,
  DrawerLanguageButtons, DrawerLanguageButton, DrawerThemeSection,
  DrawerThemeLabel, DrawerThemeSubtitle, ToggleSwitch,
} from '../css/index';
import { showToast } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { getDomainShortName } from '../utils/domainUtils';

const menuItems = [
  { label: 'Home', icon: <GoHome size={20} />, path: '/feed', requiresAuth: false },
  { label: 'Create', icon: <CiCirclePlus size={20} />, path: '/createfeed', requiresAuth: true },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleTheme, language, setLanguage, selectedThemeName, themes } = useTheme();
  console.log(selectedThemeName, "toggleThemetoggleTheme")
  const dispatch = useDispatch();

  const isLoggedIn = !!localStorage.getItem('authToken');

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const isToggled = themes.length > 0 && selectedThemeName === themes[0]?.themename;

  const handleNavigate = (item) => {
    if (item.requiresAuth && !isLoggedIn) {
      dispatch(showToast('Login to continue', 'info'));
      setTimeout(() => navigate('/login'), 1500);
      setOpen(false);
      return;
    }
    setActive(item.label);
    setOpen(false);
    navigate(item.path);
  };

  const handleSelectLanguage = (lang) => {
    const langCode = lang === 'English' ? 'en' : 'ta';
    setLanguage(langCode);
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      setOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  const handleLogin = () => {
    setOpen(false);
    navigate('/login');
  };

  const languages = ['English', 'Tamil'];
  const displayLanguage = language === 'ta' ? 'Tamil' : 'English';

  const domainName = getDomainShortName();

  return (
    <>
      <NavShell $show={show}>
        <NavbarWrap>
          <MenuButton type="button" aria-label="Open menu" onClick={() => setOpen(true)}>
            <FiMenu size={22} />
          </MenuButton>
          <BrandTitle>{domainName}</BrandTitle>
        </NavbarWrap>
      </NavShell>

      <Overlay open={open} onClick={() => setOpen(false)} />

      <Drawer open={open}>
        <DrawerHeader>
          <DrawerLogo>{domainName}</DrawerLogo>
          <CloseButton onClick={() => setOpen(false)}>
            <IoClose size={22} color="#ffffff" />
          </CloseButton>
        </DrawerHeader>

        <DrawerMenu>
          {menuItems.map((item) => (
            <DrawerItem
              key={item.label}
              active={active === item.label}
              onClick={() => handleNavigate(item)}
            >
              <DrawerIcon active={active === item.label}>{item.icon}</DrawerIcon>
              <DrawerLabel active={active === item.label}>{item.label}</DrawerLabel>
            </DrawerItem>
          ))}

          {/* ✅ Show Login or Logout based on auth state */}
          {isLoggedIn ? (
            <DrawerItem onClick={handleLogout}>
              <DrawerIcon>
                <IoLogOutOutline size={20} color="#ff4d4d" />
              </DrawerIcon>
              <DrawerLabel style={{ color: '#ff4d4d' }}>Logout</DrawerLabel>
            </DrawerItem>
          ) : (
            <DrawerItem onClick={handleLogin}>
              <DrawerIcon>
                <MdLogin size={20} color="#4caf50" />
              </DrawerIcon>
              <DrawerLabel style={{ color: '#4caf50' }}>Login</DrawerLabel>
            </DrawerItem>
          )}
        </DrawerMenu>

        <DrawerFooter>
          <DrawerLanguageSection>
            <DrawerLanguageHeader>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <DrawerLanguageLabel>Language</DrawerLanguageLabel>
                <DrawerLanguageSubtitle>{displayLanguage}</DrawerLanguageSubtitle>
              </div>
            </DrawerLanguageHeader>
            <DrawerLanguageButtons>
              {languages.map((lang) => (
                <DrawerLanguageButton
                  key={lang}
                  type="button"
                  active={displayLanguage === lang}
                  onClick={() => handleSelectLanguage(lang)}
                >
                  {lang === 'English' ? 'Eng' : 'Tam'}
                </DrawerLanguageButton>
              ))}
            </DrawerLanguageButtons>
          </DrawerLanguageSection>

          {location.pathname !== '/profilepage' && (
            <DrawerThemeSection onClick={() => { toggleTheme(); setOpen(false); }}>
              <div>
                <div><DrawerThemeLabel>Theme</DrawerThemeLabel></div>
                <DrawerThemeSubtitle>Toggle Theme</DrawerThemeSubtitle>
              </div>
              <ToggleSwitch isEnabled={isToggled} />
            </DrawerThemeSection>
          )}
        </DrawerFooter>
      </Drawer>
    </>
  );
}

export default Navbar;