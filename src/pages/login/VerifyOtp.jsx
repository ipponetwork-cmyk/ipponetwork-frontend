import { useNavigate } from 'react-router-dom';
import {
    PageWrapper,
    BackgroundPanel,
    Logo,
    Headline,
    LoginCard,
    CardHeader,
    CardSubTitle,
    Button,
    OtpWrapper,
    OtpInput,
} from '../../css';

import { useTranslation } from '../../hooks/useTranslation';
import { useState } from 'react';
import { authAPI } from '../../services/api';

function VerifyOtp() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);

    const handleOtpChange = (value, index) => {
        if (!/^\d*$/.test(value)) return;

        const updated = [...otp];
        updated[index] = value;
        setOtp(updated);

        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const handleVerify = async () => {
        const enteredOtp = otp.join('');

        if (enteredOtp.length !== 6) {
            return alert("Enter complete OTP");
        }

        setLoading(true);

        try {
            const confirmationResult = window.confirmationResult;

            if (!confirmationResult) {
                alert("Session expired. Please login again.");
                return navigate('/');
            }

            const result = await confirmationResult.confirm(enteredOtp);

            const firebaseUser = result.user;
            const idToken = await firebaseUser.getIdToken();

            const phone = localStorage.getItem('phone');

            // 🔹 Call your backend
            const response = await authAPI.getUserProfileByMobileNo(phone);

            if (response.success) {
                localStorage.setItem('authToken', idToken);
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('isNewUser', response.isNewUser ? 'true' : 'false');

                const userId = response.data?._id || response.data?.id || phone;
                console.log(userId,"userId123")
                if (response.isNewUser) {
                    navigate(`/profilepage/${userId}`);
                } else {
                    navigate('/feed');
                }
            } else {
                alert(response.message || 'Login failed.');
            }

        } catch (error) {
            console.error(error);
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
                <CardHeader>Verify</CardHeader>
                <CardSubTitle>Please enter the 6 digit OTP</CardSubTitle>

                <OtpWrapper>
                    {otp.map((digit, index) => (
                        <OtpInput
                            key={index}
                            id={`otp-${index}`}
                            type="tel"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </OtpWrapper>

                <Button onClick={handleVerify}>
                    {loading ? "Verifying..." : "Verify"}
                </Button>
            </LoginCard>
        </PageWrapper>
    );
}

export default VerifyOtp;