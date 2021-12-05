import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth }  from '../authContext';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { BiErrorCircle } from 'react-icons/bi';


const Login = () => {

    const { login, currentUser, loginError } = useAuth()
    
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const [ togglePassword, setTogglePassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const changePasswordType = () => setTogglePassword(!togglePassword);

    const loginSubmit = (e) => {
        e.preventDefault();
        
        login(email.current.value, password.current.value);
    }

    useEffect(() => {

        setLoading(false);

        if(currentUser){
            navigate('/dashboard');
        }

    }, [loading, currentUser])

    return ( 
        <div className="login">
            <div className="login-header">
                <h2>LOGIN</h2>
            </div>
            <div>
            {loginError && <div className="login-error"><BiErrorCircle />{loginError}</div>}
            </div>
            <form onSubmit={ loginSubmit }>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter Registered mail" ref={email} required/>
                </div>

                <div className="form-group" id="form-group">
                    <label htmlFor="password">Password</label>
                    <input type={ togglePassword ? "text" : "password" } placeholder="Enter Password"ref={password} required/>
                    <div className="toggle" onClick={ changePasswordType }>
                        {togglePassword ? <VscEye /> : <VscEyeClosed />}
                    </div>
                </div>
                <div className="login-btn">
                    <button type="submit" disabled={ loading }>LOGIN</button>
                </div>  
            </form>

            <div className="signup-text">
                <p>Don't have an account ? <Link to="/signup" style={{textDecoration: 'none'}}>Signup</Link></p>
            </div>
        </div>
     );
}
 
export default Login;