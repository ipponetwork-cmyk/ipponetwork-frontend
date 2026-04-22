import { BsFillGridFill } from 'react-icons/bs';
import {
    CenterWrapper,
    CardWrapper,
    CreateHeader,
    IconBox,
    CardTitle,
    CardDescription,
    CreateButton,
    ButtonWrapper
} from '../../css/index';
import { useNavigate } from 'react-router-dom';

function CreateFeed() {
    const navigate = useNavigate();
    const handleCreate = () => {
        navigate('/create-post');
        console.log('Create');
    };
    return (
        <CenterWrapper>
            <CardWrapper>
                <CreateHeader>
                    <IconBox>
                        <BsFillGridFill size={20} />
                    </IconBox>
                    <CardTitle>Create Post</CardTitle>
                </CreateHeader>

                <CardDescription>
                    Share updates, photos, or content with others.
                </CardDescription>
                <ButtonWrapper>
                    <CreateButton onClick={handleCreate}>Create</CreateButton>
                </ButtonWrapper>

            </CardWrapper>
        </CenterWrapper>
    );
}

export default CreateFeed;