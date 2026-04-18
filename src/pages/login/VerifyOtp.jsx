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
import bgImage from '../../assets/Background-ippo.png';

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
        console.log("handleverify")
        const enteredOtp = otp.join('');

        if (enteredOtp.length !== 6) {
            return alert("Enter complete OTP");
        }

        setLoading(true);

        try {
            console.log("tryBlock")
            const confirmationResult = window.confirmationResult;
            console.log(confirmationResult, "confirmationResult")
            if (!confirmationResult) {
                alert("Session expired. Please login again.");
                return navigate('/');
            }

            const result = await confirmationResult.confirm(enteredOtp);

            const firebaseUser = result.user;
            const idToken = await firebaseUser.getIdToken();
            console.log(idToken, "idToken")
            const phone = localStorage.getItem('phone');
            console.log(phone, "phone")
            // 🔹 Call your backend
            const response = await authAPI.getUserProfileByMobileNo(phone);
            console.log(response, "responseotp")
            if (response.success) {
                const token = response.token || response.data?.token || idToken;
                localStorage.setItem('authToken', token);
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('isNewUser', response.isNewUser ? 'true' : 'false');

                const userId = response.data?._id || response.data?.id || phone;
                console.log(userId, "userId123")
                if (response.isNewUser) {
                    navigate(`/profilepage/${userId}`);
                } else {
                    navigate('/feed');
                }
            } else {
                console.log("elseBlock")
                alert(response.message || 'Login failed.');
            }

        } catch (error) {
            console.log("catchBlock", error.message)
            console.error(error.message);
        } finally {
            console.log("finallyBlock")
            setLoading(false);
        }
    };

    return (
        <PageWrapper>
            <BackgroundPanel $bgImage={bgImage}>
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