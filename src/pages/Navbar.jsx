import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { GoHome } from 'react-icons/go';
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate, useLocation } from 'react-router-dom';
import useTheme from '../context/useTheme';
import {
  NavShell,
  NavbarWrap,
  MenuButton,
  BrandTitle,
  Overlay,
  Drawer,
  DrawerHeader,
  DrawerLogo,
  CloseButton,
  DrawerMenu,
  DrawerItem,
  DrawerIcon,
  DrawerLabel,
  DrawerFooter,
  DrawerLanguageSection,
  DrawerLanguageHeader,
  DrawerLanguageLabel,
  DrawerLanguageSubtitle,
  DrawerLanguageButtons,
  DrawerLanguageButton,
  DrawerThemeSection,
  DrawerThemeLabel,
  DrawerThemeSubtitle,
  ToggleSwitch,
} from '../css/index';

const menuItems = [
  { label: 'Home', icon: <GoHome size={20} />, path: '/feed' },
  { label: 'Create', icon: <CiCirclePlus size={20} />, path: '/createfeed' },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme, language, setLanguage } = useTheme();

  const handleNavigate = (item) => {
    setActive(item.label);
    setOpen(false);
    navigate(item.path);
  };

  const handleSelectLanguage = (lang) => {
    const langCode = lang === 'English' ? 'en' : 'ta';
    setLanguage(langCode);
  };

  const languages = ['English', 'Tamil'];
  const displayLanguage = language === 'ta' ? 'Tamil' : 'English';

  return (
    <>
      <NavShell>
        <NavbarWrap>
          <MenuButton type="button" aria-label="Open menu" onClick={() => setOpen(true)}>
            <FiMenu size={22} />
          </MenuButton>
          <BrandTitle>ippoChennai</BrandTitle>
        </NavbarWrap>
      </NavShell>

      <Overlay open={open} onClick={() => setOpen(false)} />

      <Drawer open={open}>

        <DrawerHeader>
          <DrawerLogo>ippoChennai</DrawerLogo>
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
              <DrawerIcon active={active === item.label}>
                {item.icon}
              </DrawerIcon>
              <DrawerLabel active={active === item.label}>
                {item.label}
              </DrawerLabel>
            </DrawerItem>
          ))}
        </DrawerMenu>

        <DrawerFooter>
          <DrawerLanguageSection>
            <DrawerLanguageHeader>
                <div style={{display:'flex', flexDirection:'column'}}>
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
            <DrawerThemeSection onClick={toggleTheme}>
              <div>
                <div><DrawerThemeLabel>Theme</DrawerThemeLabel></div>
                <DrawerThemeSubtitle>Invert Theme</DrawerThemeSubtitle>
              </div>
              <ToggleSwitch isEnabled={isDark} />
            </DrawerThemeSection>
          )}
        </DrawerFooter>

      </Drawer>
    </>
  );
}

export default Navbar;