import { AppBar, Toolbar, styled, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/userSlice'
import { logoutUser } from '../../services/authService';


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
    console.log('logout')
    await logoutUser()
    dispatch(removeUser())
    navigate('/login')
  
   }
        
    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link 
                 onClick={handleLogout}
                 >LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header;