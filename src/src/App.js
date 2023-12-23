import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.js';

const App = (props) => { 
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}

export default App;