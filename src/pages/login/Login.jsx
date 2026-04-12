import { useNavigate } from 'react-router-dom';
import {
    PageWrapper,
    BackgroundPanel,
    Logo,
    Headline,
    LoginCard,
    CardHeader,
    CardSubTitle,
    PhoneInputGroup,
    CountryCode,
    Code,
    PhoneInput,
    Button,
    PhoneNumber,
    DropdownIcon,
    LangToggle,
    LangBtn,
} from '../../css'
import { useTranslation } from '../../hooks/useTranslation';
import { useState } from 'react';

function Login() {
    const navigate = useNavigate();
    const { t,language, setLanguage } = useTranslation();
    const [step, setStep] = useState('login'); // 'login' | 'otp'
    const [phone, setPhone] = useState('');
    const value = true;
    const handleNext = () => {
        if (phone.length >= 10) {
            setStep('otp');
        }
    };

    if (step === 'otp') return navigate('/verifyotp');

    return (
        <PageWrapper>
            <BackgroundPanel>
                <Logo>{t('appName')}</Logo>
                <Headline>{t('headline')}</Headline>
            </BackgroundPanel>

            <LoginCard>
                <CardHeader>{t('signIn')}</CardHeader>
                <CardSubTitle>Enter your phone number</CardSubTitle>

                <PhoneNumber>PHONE NUMBER</PhoneNumber>
                <PhoneInputGroup>
                    <CountryCode>
                        <Code>+91</Code>
                        <DropdownIcon>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 4L6 8L10 4" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </DropdownIcon>
                    </CountryCode>
                    <PhoneInput
                        type="tel"
                        placeholder="00000 00000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        maxLength={10}
                    />
                </PhoneInputGroup>

                <Button onClick={handleNext}>Next</Button>
                {!value &&
                <LangToggle>
                    <LangBtn active={language === 'en'} onClick={() => setLanguage('en')}>EN</LangBtn>
                    <LangBtn active={language === 'ta'} onClick={() => setLanguage('ta')}>தமிழ்</LangBtn>
                </LangToggle>}
            </LoginCard>
        </PageWrapper>
    );
}

export default Login;