import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';

import { selectIsSigned, logout } from './reducers/auth.js';
import SignPage from './components/Sign/SignPage.js';

const App = () => { 

    const [ modal, setModal ] = useState({
		show: false,
		type: 'login'
	});

    const isSigned = useSelector(selectIsSigned);

	const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
		if (isSigned) {
			setModal((prevState) => ({ ...prevState, show: false}));
			navigate('/')
		}
	}, [ isSigned ])

	const handleSignClick = (type) => () => {
		if (type === 'logout') {
			dispatch(logout());
			navigate('/');
		} else {
			setModal({ show: true, type });
		}
	}

    return (
        <div>
            <Navbar handleSignClick={handleSignClick} isSigned={isSigned} />
            { !isSigned && <Home />}
            { modal.show && <SignPage setModal={setModal} />}
            { isSigned && <Outlet />}
        </div>
    );
}

export default App;