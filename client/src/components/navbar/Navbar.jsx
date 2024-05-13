import './Navbar.css';
import logo from '../../assets/logo-nav-cohispania.png'

const Nav = () => {
    return (
      <div className='navbar'>
          <img src={logo} alt="logo" className='logo'/>
      </div>
    );
  }
  
  export default Nav;