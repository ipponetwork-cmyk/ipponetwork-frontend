import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

function ProfilePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const phone = location.state?.phone;

    const [avatar, setAvatar] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
        }
    };

    const onSubmit = (data) => {
        console.log('Profile:', data, 'Phone:', phone);
        navigate('/feed');
    };

    return (
        <>
            <PageWrappers>
                <ImageSection>
                    <AvatarWrapper>
                        <Avatar src={avatar || '/src/assets/homelander1.jpg'} alt="profile" />
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
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

                    <FieldLabel>USERNAME</FieldLabel>
                    <FieldInput
                        placeholder="Enter username"
                        {...register('username', { required: 'Username is required' })}
                    />
                    {errors.username && <ErrorText>{errors.username.message}</ErrorText>}

                    <FieldLabel>GMAIL</FieldLabel>
                    <FieldInput
                        placeholder="Enter gmail"
                        {...register('gmail', {
                            required: 'Gmail is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Enter a valid email',
                            },
                        })}
                    />
                    {errors.gmail && <ErrorText>{errors.gmail.message}</ErrorText>}

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

            <ContinueButton onClick={handleSubmit(onSubmit)}>Continue</ContinueButton>
        </>
    );
}

export default ProfilePage;