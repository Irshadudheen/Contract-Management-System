import { AppBar, Toolbar, styled, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
// import { logout } from '../../Api/user';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/userSlice';
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';


const Component = styled(AppBar)`
    background: #FFFFFF;
    color: black;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
    }
`

const Header = () => {
console.log('header')
    const navigate = useNavigate();
const dispatch = useDispatch()
   const handleLogout=async()=>{

    await logout()
    dispatch(removeUser())
    navigate('/account')
  
   }
        
    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link to='/account'
                //  onClick={handleLogout}
                 >LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header;