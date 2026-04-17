// import { useNavigate } from 'react-router-dom';
// import {
//     PageWrapper,
//     BackgroundPanel,
//     Logo,
//     Headline,
//     LoginCard,
//     CardHeader,
//     CardSubTitle,
//     PhoneInputGroup,
//     CountryCode,
//     Code,
//     PhoneInput,
//     Button,
//     PhoneNumber,
//     DropdownIcon,
// } from '../../css';

// import { useTranslation } from '../../hooks/useTranslation';
// import { useState, useRef } from 'react';

// import { auth } from '../../firebase';
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// function Login() {
//     const navigate = useNavigate();
//     const { t } = useTranslation();
//     const [phone, setPhone] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const recaptchaRef = useRef(null);
//     const recaptchaVerifier = useRef(null);

//     // Setup Recaptcha
//     const setupRecaptcha = () => {
//         if (recaptchaVerifier.current) return;

//         recaptchaVerifier.current = new RecaptchaVerifier(
//             auth,
//             recaptchaRef.current,
//             {
//                 size: 'normal',
//                 callback: () => {
//                     console.log('reCAPTCHA verified');
//                 },
//                 'expired-callback': () => {
//                     console.log('reCAPTCHA expired');
//                 },
//             }
//         ); 
//     };

//     const handleNext = async () => {
//         if (phone.length !== 10) {
//             setError("Enter valid phone number");
//             return;
//         }

//         setLoading(true);
//         setError('');

//         try {
//             setupRecaptcha();

//             const fullPhone = `+91${phone}`;
//             const appVerifier = recaptchaVerifier.current;

//             const confirmationResult = await signInWithPhoneNumber(
//                 auth,
//                 fullPhone,
//                 appVerifier
//             );

//             // Store globally for OTP page
//             window.confirmationResult = confirmationResult;

//             // Store phone
//             localStorage.setItem('phone', phone);

//             navigate('/verifyotp');

//         } catch (err) {
//             console.error(err);
//             setError(err.message || "Failed to send OTP");

//             // Reset reCAPTCHA on error
//             if (recaptchaVerifier.current) {
//                 recaptchaVerifier.current.clear();
//                 recaptchaVerifier.current = null;
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <PageWrapper>
//             <BackgroundPanel>
//                 <Logo>{t('appName')}</Logo>
//                 <Headline>{t('headline')}</Headline>
//             </BackgroundPanel>

//             <LoginCard>
//                 <CardHeader>{t('signIn')}</CardHeader>
//                 <CardSubTitle>Enter your phone number</CardSubTitle>

//                 <PhoneNumber>PHONE NUMBER</PhoneNumber>

//                 <PhoneInputGroup>
//                     <CountryCode>
//                         <Code>+91</Code>
//                         <DropdownIcon>
//                             <svg width="12" height="12" viewBox="0 0 12 12">
//                                 <path d="M2 4L6 8L10 4" stroke="#888" strokeWidth="1.5" />
//                             </svg>
//                         </DropdownIcon>
//                     </CountryCode>

//                     <PhoneInput
//                         type="tel"
//                         placeholder="00000 00000"
//                         value={phone}
//                         onChange={(e) =>
//                             setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
//                         }
//                     />
//                 </PhoneInputGroup>

//                 {/* reCAPTCHA */}
      
//     <div
//         ref={recaptchaRef}
//         style={{
//             marginTop: '16px',
//             display: 'flex',
//             justifyContent: 'center'
//         }}
//     />


//                 {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}

//                 <Button onClick={handleNext} disabled={loading}>
//                     {loading ? "Sending OTP..." : "Next"}
//                 </Button>
//             </LoginCard>
//         </PageWrapper>
//     );
// }

// export default Login;

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
import { useState, useRef, useEffect } from 'react';

import { auth } from '../../firebase';
import PwaInstallPrompt from '../../components/PwaInstallPrompt';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

function Login() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const recaptchaRef = useRef(null);
    const recaptchaVerifier = useRef(null);

    // Setup Recaptcha
    // const setupRecaptcha = () => {
    //     if (recaptchaVerifier.current) return;

    //     recaptchaVerifier.current = new RecaptchaVerifier(
    //         auth,
    //         recaptchaRef.current,
    //         {
    //             size: 'normal',
    //             callback: () => {
    //                 console.log('reCAPTCHA verified');
    //             },
    //             'expired-callback': () => {
    //                 console.log('reCAPTCHA expired');
    //             },
    //         }
    //     );
    // };
    // Remove the setupRecaptcha() call from handleNext
    // and replace the recaptcha setup with this:

    useEffect(() => {
        recaptchaVerifier.current = new RecaptchaVerifier(
            auth,
            recaptchaRef.current,
            {
                size: 'normal',
                callback: () => console.log('reCAPTCHA verified'),
                'expired-callback': () => console.log('reCAPTCHA expired'),
            }
        );

        recaptchaVerifier.current.render();

        return () => {
            recaptchaVerifier.current?.clear();
            recaptchaVerifier.current = null;
        };
    }, []);
    const handleNext = async () => {
        if (phone.length !== 10) {
            setError("Enter valid phone number");
            return;
        }

        setLoading(true);
        setError('');

        try {
            // setupRecaptcha();

            const fullPhone = `+91${phone}`;
            const appVerifier = recaptchaVerifier.current;

            const confirmationResult = await signInWithPhoneNumber(
                auth,
                fullPhone,
                appVerifier
            );

            // Store globally for OTP page
            window.confirmationResult = confirmationResult;

            // Store phone
            localStorage.setItem('phone', phone);

            navigate('/verifyotp');

        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to send OTP");

            // Reset reCAPTCHA on error
            if (recaptchaVerifier.current) {
                recaptchaVerifier.current.clear();
                recaptchaVerifier.current = null;
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWrapper>
            <PwaInstallPrompt message="Install the app for faster access and offline support." />
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
                            <svg width="12" height="12" viewBox="0 0 12 12">
                                <path d="M2 4L6 8L10 4" stroke="#888" strokeWidth="1.5" />
                            </svg>
                        </DropdownIcon>
                    </CountryCode>

                    <PhoneInput
                        type="tel"
                        placeholder="00000 00000"
                        value={phone}
                        onChange={(e) =>
                            setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                        }
                    />
                </PhoneInputGroup>

                {/* reCAPTCHA */}

                <div
                    ref={recaptchaRef}
                    style={{
                        marginTop: '16px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                />


                {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}

                <Button onClick={handleNext} disabled={loading}>
                    {loading ? "Sending OTP..." : "Next"}
                </Button>
            </LoginCard>
        </PageWrapper>
    );
}

export default Login;