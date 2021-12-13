import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';
import { BiErrorCircle } from 'react-icons/bi';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

const Signup = () => {

    const { register, currentUser, signupError } = useAuth(); 
    const nameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const emailRef = useRef();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [signupPassword, setSignupPassword] = useState(false);
    const [secondPass, setSecondPass] = useState(false);
    const [loading, setLoading] = useState(true);


    // password toggle
    const changeSignupPasswordType = () => setSignupPassword(!signupPassword);

    const changeSignupConfirmPassType = () => setSecondPass(!secondPass);


    const handleSubmit = (e) => {
        e.preventDefault();

        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            setError('Passwords do not match');
        }else{
            register(nameRef.current.value, emailRef.current.value, passwordRef.current.value);            
        }

        
    }

    useEffect(() => {

        setLoading(false);

        if(currentUser){
            navigate('/dashboard');
        }

    }, [loading, currentUser])

    return ( 
        <div className="signup">
            <div className="container">
                <h2>Sign up</h2>
                <div>
                    {error  && <div className="error"><BiErrorCircle />{ error }</div>}
                </div>
                <div>
                    {signupError  && <div className="error"><BiErrorCircle />{ signupError }</div>}
                </div>
                <form onSubmit = { handleSubmit }>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text"  placeholder="Enter Full Name" ref={ nameRef } required/>
                
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email"  placeholder="Enter Valid Email" ref={emailRef} required/>
                    </div>
                    <div className="form-group" id="form-group">
                        <label htmlFor="password">Password</label>
                        <input type={signupPassword ? "text" : "password"} placeholder="Enter Password" ref={passwordRef} required/>
                        <div className="signup-toggle" onClick={ changeSignupPasswordType }>
                            {signupPassword ? <VscEye /> : <VscEyeClosed />}
                        </div>
                    </div>
                    <div className="form-group" id="form-group">
                        <label htmlFor="password">Confirm Password</label>
                        <input type={secondPass ? "text" : "password"} placeholder="Confirm Password"ref={confirmPasswordRef} required/>
                        <div className="signup-toggle" onClick={ changeSignupConfirmPassType }>
                            {secondPass ? <VscEye /> : <VscEyeClosed />}
                        </div>
                    </div>
                    <div className="signup-btn">
                        <button disabled={ loading }>SIGN UP</button>
                    </div>
                </form>
                <div className="login-text">
                    <p>Already have an account <Link to="/login" className="login-text-link">Login</Link></p>
                </div>
            </div>
        </div>
     );
}
 
export default Signup;