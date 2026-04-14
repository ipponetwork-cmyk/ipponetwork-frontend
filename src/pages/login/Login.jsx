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
} from '../../css';

import { useTranslation } from '../../hooks/useTranslation';
import { useState } from 'react';

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase.js";

function Login() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

   const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
        return;
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
            size: "invisible",
            callback: (response) => {
                console.log("Recaptcha verified",response);
            },
        }
    );

    window.recaptchaVerifier.render();
};


    const handleNext = async () => {
        console.log(phone,"PPMknds")
        if (phone.length < 10) {
            return alert("Enter valid phone number");
        }

        setLoading(true);

        try {
            setupRecaptcha();

            const fullPhone = `+91${phone}`;
            const appVerifier = window.recaptchaVerifier;

            const confirmationResult = await signInWithPhoneNumber(
                auth,
                fullPhone,
                appVerifier
            );

            // store globally
            window.confirmationResult = confirmationResult;

            // Store phone for later use
            localStorage.setItem('phone', phone);

            navigate('/verifyotp');

        } catch (error) {
             console.error("OTP error:", error.code, error.message); 
            alert("Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

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
                        type="number"
                        placeholder="00000 00000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        maxLength={10}
                    />
                </PhoneInputGroup>

                <Button onClick={handleNext}>
                    {loading ? "Sending..." : "Next"}
                </Button>

                {/* Firebase Recaptcha */}
                <div id="recaptcha-container"></div>
            </LoginCard>
        </PageWrapper>
    );
}

export default Login;
