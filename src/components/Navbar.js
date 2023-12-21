import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
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
                <li className='nav-feedbacks'>
                    <Link to='/compare' className='element-underline'>Compare</Link>
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