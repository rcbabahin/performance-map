import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectAuthStatus, selectAuthError } from "../../reducers/auth.js";

import { 
    signinUser
} from "../../reducers/auth.js";

function SignForm() {
    const dispatch = useDispatch();

    const inputName = useRef(null);
    const inputPass = useRef(null);

    const status = useSelector(selectAuthStatus);
    const error = useSelector(selectAuthError);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const user = {
            name: inputName.current.value,
            password: inputPass.current.value
        }

        dispatch(signinUser(user));        
    }

    if (status === 'loading')
        return <div className='loading'/>


    return (
        <div>
            <form id='sign-form' onSubmit={handleSubmit}>
                <input 
                    required 
                    ref={inputName}
                    type="name" 
                    id="name" 
                    placeholder="Username"
                />
                <input 
                    required 
                    ref={inputPass}
                    type="password" 
                    id="password" 
                    placeholder="Password" 
                />
                <button type="submit" className="btn-black">Login</button>
            </form>
            { error &&
                <div className="status-text">⛔ Error: "{error}"</div>
            }
        </div>
    )
}

export default SignForm;