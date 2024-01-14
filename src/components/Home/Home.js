import { useNavigate } from 'react-router-dom';

import boombox from '../../assets/boom-box.png';

const Home = (props) => { 

    let navigate = useNavigate();

    return (
        <section className='home'>
            <div className='welcome'>
                <div>
                    <h1><div className='features'>Analyze sound devices</div> Sound <br /> Performance Map</h1>
                    <p>App is intended to create and analyze different audio characteristics of devices and vizualize raw sound data.</p>
                    <button 
                        className='btn-black' 
                        onClick={(e) => { navigate('/devices') }}>
                            See devices
                    </button>
                </div>
                <img alt='wizard' src={boombox}></img>
            </div>
        </section>
    );
}

export default Home;