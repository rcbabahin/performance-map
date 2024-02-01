import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';

function Navbar({ handleSignClick, isSigned }) {
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
            <ul>
                <li className='nav-logo'>
                    <Link to='/'>
                        <img alt='logo' src={logo} />
                    </Link>
                </li>
                { isSigned && 
                    <li className='nav-feedbacks'>
                        <Link to='/info' className='element-underline'>Info</Link>
                    </li>
                }
                { isSigned && 
                    <li className='nav-signup'>
                        <Link to='/devices' className='element-underline'>Devices</Link>
                    </li>
                }
                { isSigned && 
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
                }
                { isSigned && 
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
                }
                { isSigned && 
                    <li className='nav-login'>
                        <Link to='/calculations' className='element-underline'>Calculate</Link>
                    </li>
                }
                <li className='nav-sign'>
                    { isSigned 
                        ? <button className='btn-black' onClick={handleSignClick('logout')}>Logout</button>
                        : <button className='btn-black' onClick={handleSignClick('login')}>Login</button>
                    }
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;