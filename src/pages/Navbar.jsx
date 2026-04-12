import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { GoHome } from 'react-icons/go';
import { CiCirclePlus } from "react-icons/ci";
import { MdLanguage } from "react-icons/md";
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
  DrawerLanguageWrap,
  DrawerLanguageSection,
  DrawerLanguageDropdown,
  DrawerLanguageOption,
  DrawerLanguageIcon,
  DrawerLanguageLabel,
  DrawerThemeSection,
  DrawerThemeLabel,
  ToggleSwitch,
} from '../css/index';

const menuItems = [
  { label: 'Home', icon: <GoHome size={20} />, path: '/home' },
  { label: 'Create', icon: <CiCirclePlus size={20} />, path: '/createfeed' },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState('English');
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const handleNavigate = (item) => {
    setActive(item.label);
    setOpen(false);
    navigate(item.path);
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    setLanguageOpen(false);
  };

  const languages = ['English', 'Tamil'];

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
          <DrawerLanguageWrap>
            {languageOpen && (
              <DrawerLanguageDropdown>
                {languages
                  .filter((lang) => lang !== language)
                  .map((lang) => (
                    <DrawerLanguageOption
                      key={lang}
                      active={false}
                      onClick={() => handleSelectLanguage(lang)}
                    >
                      <DrawerLanguageIcon>
                        <MdLanguage size={20} />
                      </DrawerLanguageIcon>
                      {lang}
                    </DrawerLanguageOption>
                  ))}
              </DrawerLanguageDropdown>
            )}

            <DrawerLanguageSection onClick={() => setLanguageOpen((prev) => !prev)}>
              <DrawerLanguageIcon>
                <MdLanguage size={20} />
              </DrawerLanguageIcon>
              <DrawerLanguageLabel>{language}</DrawerLanguageLabel>
            </DrawerLanguageSection>
          </DrawerLanguageWrap>

          {location.pathname !== '/profilepage' && (
            <DrawerThemeSection onClick={toggleTheme}>
              <DrawerThemeLabel>Dark Theme</DrawerThemeLabel>
              <ToggleSwitch isEnabled={isDark} />
            </DrawerThemeSection>
          )}
        </DrawerFooter>

      </Drawer>
    </>
  );
}

export default Navbar;