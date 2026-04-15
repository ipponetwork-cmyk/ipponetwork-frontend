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
import { authAPI } from '../../services/api';
// import { useDispatch } from 'react-redux';

function Login() {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const { t } = useTranslation();

    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleNext = async () => {
        console.log(phone, "Phone Number Entered");
        
        if (phone.length < 10) {
            setError("Enter valid phone number");
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Call backend API with phone number (without +91 prefix, API expects just the number)
            const response = await authAPI.getUserProfileByMobileNo(phone);

            if (response.success) {
                // Store token and user data
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('isNewUser', response.isNewUser);
                
                // Dispatch to Redux if needed (optional)
                // dispatch(setUser(response.data));
                
                console.log(response.message);
                const userId = response.data?._id || response.data?.id || '69ddcf8f64e56fb6b236da54';

                // Navigate based on whether it's a new user
                if (response.isNewUser) {
                    // For new users, redirect to profile page with id
                    navigate(`/profilepage/${userId}`);
                } else {
                    // Existing users go to feed/home
                    navigate('/');
                }
            } else {
                setError(response.message || "Failed to authenticate");
            }
        } catch (error) {
            console.error("Authentication error:", error);
            const errorMessage = error.message ;
            setError(errorMessage);
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

                {error && <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>{error}</div>}

                <Button onClick={handleNext} disabled={loading}>
                    {loading ? "Signing in..." : "Next"}
                </Button>
            </LoginCard>
        </PageWrapper>
    );
}

export default Login;
