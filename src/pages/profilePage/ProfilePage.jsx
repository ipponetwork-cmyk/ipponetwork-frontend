import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
    PageWrappers,
    ImageSection,
    AvatarWrapper,
    Avatar,
    CameraButton,
    ProfileImageTitle,
    ProfileImageSubtitle,
    ChangePhotoText,
    FormSection,
    FieldLabel,
    FieldInput,
    DateInput,
    CalendarIcon,
    DateWrapper,
    ContinueButton,
    ErrorText,
} from '../../css/index'
import { MdOutlineCalendarToday } from 'react-icons/md';
import { MdOutlineCameraAlt } from 'react-icons/md';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { authAPI } from '../../services/api';
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/actions';

function ProfilePage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const [avatar, setAvatar] = useState(null);
    const [files, setFiles] = useState({});
    const [photoError, setPhotoError] = useState('');

    const {
        register,
        handleSubmit,
        trigger,
        watch,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({ mode: 'onChange' });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
            setFiles(prev => ({ ...prev, photo: file }));
            setPhotoError('');
        }
    };

    const usernameValue = watch('username');
    const [usernameMessage, setUsernameMessage] = useState('');
    const [checkingUsername, setCheckingUsername] = useState(false);

    useEffect(() => {
        if (!usernameValue) {
            clearErrors('username');
            setUsernameMessage('');
            return;
        }

        const debounced = setTimeout(async () => {
            setCheckingUsername(true);
            try {
                const result = await authAPI.checkUsername(usernameValue);
                setUsernameMessage(result.available ? 'Username available' : 'Username not available');
                if (result.available) {
                    clearErrors('username');
                } else {
                    setError('username', {
                        type: 'manual',
                        message: result.message || 'Username is unavailable',
                    });
                }
            } catch (err) {
                setError('username', {
                    type: 'manual',
                    message: err.message || 'Invalid username',
                });
                setUsernameMessage('');
            } finally {
                setCheckingUsername(false);
            }
        }, 400);

        return () => clearTimeout(debounced);
    }, [usernameValue, clearErrors, setError]);

    const onSubmit = async (data) => {
        const isFormValid = await trigger();
        
        if (!isFormValid || !files.photo) {
            if (!files.photo) {
                setPhotoError('Photo is required');
            }
            return;
        }
        
        console.log(data, 'Datata from form');
        const userId = id;

        try {
            const profileData = {
                name: data.name,
                username: data.username,
                dob: data.dob,
                emailid: data.emailid,
                photo: files.photo,
            };
            await authAPI.updateUserProfile(userId, profileData);
            
            // Save the updated username and name to localStorage
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const updatedUser = { ...user, username: data.username, name: data.name };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            dispatch(showToast('Profile created successfully', 'success'));
            navigate('/feed');
        } catch (error) {
            dispatch(showToast(error.message || 'Failed to create profile', 'error'));
        }
    };

    return (
        <>
            <PageWrappers>
                <ImageSection>
                    <AvatarWrapper>
                        {avatar ? (
                            <Avatar src={avatar} alt="profile" />
                        ) : (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '50%'
                            }}>
                                <MdOutlineAccountCircle size={80} color="#999999" />
                            </div>
                        )}
                        <CameraButton as="label" htmlFor="avatar-upload">
                            <MdOutlineCameraAlt size={16} color="#000000" />
                        </CameraButton>
                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                    </AvatarWrapper>
                    {photoError && <ErrorText>{photoError}</ErrorText>}
                    <ProfileImageTitle>Profile Image</ProfileImageTitle>
                    <ProfileImageSubtitle>
                        Recommended size 400×400px. JPG or PNG.
                    </ProfileImageSubtitle>
                    <ChangePhotoText as="label" htmlFor="avatar-upload">
                        Change Photo
                    </ChangePhotoText>
                </ImageSection>

                <FormSection>
                    <FieldLabel>NAME</FieldLabel>
                    <FieldInput
                        placeholder="Enter name"
                        {...register('name', {
                            required: 'Name is required',
                            minLength: {
                                value: 2,
                                message: 'Name must be at least 2 characters',
                            },
                        })}
                    />
                    {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

                    <FieldLabel>USERNAME</FieldLabel>
                    <FieldInput
                        placeholder="Enter username"
                        {...register('username', {
                            required: 'Username is required',
                            pattern: {
                                value: /^[a-zA-Z]+[0-9]{3}$/, 
                                message: 'Username must be letters followed by 3 digits, e.g. suresh123',
                            },
                        })}
                    />
                    {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
                    {usernameValue && !errors.username && (
                        <ErrorText style={{ color: checkingUsername ? '#666' : '#28a745' }}>
                            {checkingUsername ? 'Checking username...' : usernameMessage}
                        </ErrorText>
                    )}

                    <FieldLabel>EMAIL ID</FieldLabel>
                    <FieldInput
                        placeholder="Enter email"
                        {...register('emailid', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Enter a valid email',
                            },
                        })}
                    />
                    {errors.emailid && <ErrorText>{errors.emailid.message}</ErrorText>}

                    <FieldLabel>DATE OF BIRTH</FieldLabel>
                    <DateWrapper>
                        <DateInput
                            type="date"
                            placeholder="dd/mm/yyyy"
                            {...register('dob', { required: 'Date of birth is required' })}
                        />
                        <CalendarIcon>
                            <MdOutlineCalendarToday size={18} color="#ffff" />
                        </CalendarIcon>
                    </DateWrapper>
                    {errors.dob && <ErrorText>{errors.dob.message}</ErrorText>}
                </FormSection>
            </PageWrappers>

            <ContinueButton  onClick={handleSubmit(onSubmit)}>Continue</ContinueButton>
        </>
    );
}

export default ProfilePage;