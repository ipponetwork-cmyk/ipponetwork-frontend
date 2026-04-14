// import { useNavigate } from 'react-router-dom';
// import {
//     PageWrapper,
//     BackgroundPanel,
//     Logo,
//     Headline,
//     LoginCard,
//     CardHeader,
//     CardSubTitle,
//     Button,
//     OtpWrapper,
//     OtpInput,
// } from '../../css'
// import { useTranslation } from '../../hooks/useTranslation';
// import { useState } from 'react';
// function VerifyOtp() {
//     const { t } = useTranslation();
//     const [otp, setOtp] = useState(['', '', '', '']);
//     const navigate = useNavigate('/profilepage')
//     const handleOtpChange = (value, index) => {
//         if (!/^\d*$/.test(value)) return;
//         const updated = [...otp];
//         updated[index] = value;
//         setOtp(updated);

//         if (value && index < 3) {
//             document.getElementById(`otp-${index + 1}`).focus();
//         }
//     };

//     const handleKeyDown = (e, index) => {
//         if (e.key === 'Backspace' && !otp[index] && index > 0) {
//             document.getElementById(`otp-${index - 1}`).focus();
//         }
//     };

//     const handleVerify = () => {
//         const enteredOtp = otp.join('');
//         console.log('OTP entered:', enteredOtp);
//         navigate('/profilepage')
//         // call your verify API here
//     };

//     return (
//         <PageWrapper>
//             <BackgroundPanel>
//                 <Logo>{t('appName')}</Logo>
//                 <Headline>{t('headline')}</Headline>
//             </BackgroundPanel>

//             <LoginCard>
//                 <CardHeader>Verify</CardHeader>
//                 <CardSubTitle>please enter the 4 digit OTP</CardSubTitle>

//                 <OtpWrapper>
//                     {otp.map((digit, index) => (
//                         <OtpInput
//                             key={index}
//                             id={`otp-${index}`}
//                             type="tel"
//                             maxLength={1}
//                             value={digit}
//                             onChange={(e) => handleOtpChange(e.target.value, index)}
//                             onKeyDown={(e) => handleKeyDown(e, index)}
//                         />
//                     ))}
//                 </OtpWrapper>

//                 <Button onClick={handleVerify}>Verify</Button>
//             </LoginCard>
//         </PageWrapper>
//     );
// }

// export default VerifyOtp;

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

function VerifyOtp() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6-digit OTP
    const [loading, setLoading] = useState(false);

    const handleOtpChange = (value, index) => {
        if (!/^\d*$/.test(value)) return;

        const updated = [...otp];
        updated[index] = value;
        setOtp(updated);

        if (value && index < otp.length - 1) {
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

        if (enteredOtp.length < 6) {
            return alert("Enter complete OTP");
        }

        setLoading(true);

        try {
            const confirmationResult = window.confirmationResult;

            if (!confirmationResult) {
                alert("Session expired. Please login again.");
                return navigate('/');
            }

            await confirmationResult.confirm(enteredOtp);

            // Get phone from previous page or state
            const phone = localStorage.getItem('phone'); // Assuming stored in Login.jsx

            // Call backend to get/create user profile
            const response = await fetch('http://localhost:3000/user/getuserprofilebymobileno', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobileno: phone }),
            });

            const data = await response.json();

            if (data.success) {
                // Store user data and token
                localStorage.setItem('user', JSON.stringify(data.data));
                localStorage.setItem('token', data.token);
                localStorage.setItem('isNewUser', data.isNewUser);

                alert("Login Successful ✅");
                navigate('/profilepage', { state: { user: data.data, isNewUser: data.isNewUser } });
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error(error);
            alert("Invalid OTP ❌");
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
