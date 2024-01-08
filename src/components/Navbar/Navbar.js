import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import { useState } from 'react';

function Navbar() {
    const [ showRatings, setShowRatings ] = useState(false);
    const [ showCompare, setShowCompare ] = useState(false);

    const handleMenuShow = (type, show) => (e) => {
        e.stopPropagation();

        if (type === 'compare') {
            setShowCompare(show)
        } else if (type === 'ratings') {
            setShowRatings(show)
        }
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
                    className='compare'
                    onMouseEnter={handleMenuShow('compare', true)} 
                    onMouseLeave={handleMenuShow('compare', false)}
                >
                    <div className='ratings'>
                        <span>Compare</span> 
                        <span style={{ paddingLeft: '10px'}}><FontAwesomeIcon icon={faAngleDown}  size="xs" /></span>
                    </div>
                    { showCompare &&
                        <div className='menu-options'>
                            <Link to='/compare-bass' className='element-underline'>Bass</Link>
                            <Link to='/compare-spl' className='element-underline'>SPL</Link>
                            <Link to='/compare-thd' className='element-underline'>THD</Link>
                        </div>
                    }
                </li>
                <li 
                    className='nav-feedbacks' 
                    onMouseEnter={handleMenuShow('ratings', true)} 
                    onMouseLeave={handleMenuShow('ratings', false)}
                >
                    <div className='ratings'>
                        <span>Ratings</span> 
                        <span style={{ paddingLeft: '10px'}}><FontAwesomeIcon icon={faAngleDown}  size="xs" /></span>
                    </div>
                    { showRatings &&
                        <div className='menu-options'>
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