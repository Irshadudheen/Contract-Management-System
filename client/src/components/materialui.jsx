import { TextField, Box, Button, Typography, styled,Table,Link } from '@mui/material';

;

export const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
    margin-top: 50px;
`;
export const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

export const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

export const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

export const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

export const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
export const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;
    
export const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;
    
export const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

export const Image = styled(Box)`
    width: 100%;
    background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1
`;

export const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
`;

export const ContainerPost = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 350px;
    width: 100%;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

export const ImagePost = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

export const TextPost = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

export const HeadingPost = styled(Typography)`
    font-size: 18px;
    font-weight: 600
`;

export const DetailsPost = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;