import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import { useState } from 'react';

function Navbar() {
    const [ showMenu, setShowMenu ] = useState(false);

    const handleMouseEnter = (e) => {
        setShowMenu(true);
    }

    return (
        <nav className='flex-nav'>
            <ul >
                <li className='nav-logo'>
                    <Link to='/'>
                        <img alt='logo' src={logo} />
                    </Link>
                </li>
                <li className='nav-feedbacks'>
                    <Link to='/info' className='element-underline'>Info</Link>
                </li>
                <li 
                    className='nav-feedbacks' 
                    onMouseEnter={(e) => { setShowMenu(true) }} 
                    onMouseLeave={(e) => { setShowMenu(false) }}
                >
                    <div className='ratings'>
                        <span>Ratings</span> 
                        <span style={{ paddingLeft: '10px'}}><FontAwesomeIcon icon={faAngleDown}  size="xs" /></span>
                    </div>
                    { showMenu &&
                        <div className='ratings-menu-options'>
                            <Link to='/ratings-all-devices' className='element-underline'>All Devices</Link>
                            <Link to='/ratings-by-size' className='element-underline'>By Size</Link>
                        </div>
                    }
                </li>
                <li className='nav-login'>
                    <Link to='/calculations' className='element-underline'>Calculate</Link>
                </li>
                <li className='nav-signup'>
                    <Link to='/add-new-device' className='element-underline'>Add New</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;