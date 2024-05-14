import './Navbar.css';
import logo from '../../assets/logo-nav-cohispania.png'
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <Link to="/" className='navbar'>
          <img src={logo} alt="logo" className='logo'/>
        </Link>
     
    );
  }
  
  export default Nav;
