// import styled from 'styled-components';
// import { IoCheckmark, IoClose, IoInformationCircle } from 'react-icons/io5';

// const Wrapper = styled.div`
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     padding: 4px 0;
//     background: #000000;
//     width: 100%;
// `;

// const IconBox = styled.div`
//     width: 36px;
//     height: 36px;
//     min-width: 36px;
//     background: ${({ type }) =>
//         type === 'success' ? '#1a472a' :
//             type === 'error' ? '#4a1a1a' :
//                 type === 'info' ? '#1a2a4a' :
//                     '#2a2a2a'};
//     border-radius: 8px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `;

// const TextBox = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 2px;
//     flex: 1;
// `;

// const Title = styled.span`
//     font-size: 14px;
//     font-weight: 600;
//     color: #ffffff;
//     font-family: 'Sora', sans-serif;
// `;

// const Subtitle = styled.span`
//     font-size: 12px;
//     color: #aaaaaa;
//     font-family: 'Sora', sans-serif;
// `;

// const getIcon = (type) => {
//     switch (type) {
//         case 'success': return <IoCheckmark size={18} color="#4caf50" />;
//         case 'error': return <IoClose size={18} color="#f44336" />;
//         case 'info': return <IoInformationCircle size={18} color="#2196f3" />;
//         default: return <IoCheckmark size={18} color="#ffffff" />;
//     }
// };

// const CustomToast = ({ title, subtitle, type }) => (
//     <Wrapper>
//         <IconBox type={type}>
//             {getIcon(type)}
//         </IconBox>
//         <TextBox>
//             <Title>{title}</Title>
//             {subtitle && <Subtitle>{subtitle}</Subtitle>}
//         </TextBox>
//     </Wrapper>
// );

// export default CustomToast;

// CustomToast.js
import styled from 'styled-components';
import { IoCheckmark, IoClose, IoInformationCircle } from 'react-icons/io5';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 4px 0;
    background: #000000;
    width: 100%;
`;

const IconBox = styled.div`
    width: 36px;
    height: 36px;
    min-width: 36px;
    background: ${({ type }) =>
        type === 'success' ? '#1a472a' :
        type === 'error'   ? '#4a1a1a' :
        type === 'info'    ? '#1a2a4a' :
        '#2a2a2a'};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
`;

const Title = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    font-family: 'Sora', sans-serif;
`;

const Subtitle = styled.span`
    font-size: 12px;
    color: #aaaaaa;
    font-family: 'Sora', sans-serif;
`;

const getIcon = (type) => {
    switch (type) {
        case 'success': return <IoCheckmark size={18} color="#4caf50" />;
        case 'error':   return <IoClose size={18} color="#f44336" />;
        case 'info':    return <IoInformationCircle size={18} color="#2196f3" />;
        default:        return <IoCheckmark size={18} color="#ffffff" />;
    }
};

const CustomToast = ({ title, subtitle, type }) => (
    <Wrapper>
        <IconBox type={type}>
            {getIcon(type)}
        </IconBox>
        <TextBox>
            <Title>{title}</Title>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </TextBox>
    </Wrapper>
);

export default CustomToast;