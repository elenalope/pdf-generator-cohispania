import './Navbar.css';
import logo from '../../assets/logo-nav-cohispania.png'
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
      <div className='navbar'>
        <Link to="/" >
          <img src={logo} alt="logo" className='logo'/>
        </Link>
     </div>
    );
  }
  
  export default Nav;
