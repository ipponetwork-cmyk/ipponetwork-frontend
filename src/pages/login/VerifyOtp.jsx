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
} from '../../css'
import { useTranslation } from '../../hooks/useTranslation';
import { useState } from 'react';
function VerifyOtp() {
    const { t } = useTranslation();
    const [otp, setOtp] = useState(['', '', '', '']);
    const navigate = useNavigate('/profilepage')
    const handleOtpChange = (value, index) => {
        if (!/^\d*$/.test(value)) return;
        const updated = [...otp];
        updated[index] = value;
        setOtp(updated);

        if (value && index < 3) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const handleVerify = () => {
        const enteredOtp = otp.join('');
        console.log('OTP entered:', enteredOtp);
        navigate('/profilepage')
        // call your verify API here
    };

    return (
        <PageWrapper>
            <BackgroundPanel>
                <Logo>{t('appName')}</Logo>
                <Headline>{t('headline')}</Headline>
            </BackgroundPanel>

            <LoginCard>
                <CardHeader>Verify</CardHeader>
                <CardSubTitle>please enter the 4 digit OTP</CardSubTitle>

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

                <Button onClick={handleVerify}>Verify</Button>
            </LoginCard>
        </PageWrapper>
    );
}

export default VerifyOtp;