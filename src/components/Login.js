import '../App.css';
import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import useAuth from './hooks/useAuth ';
import useLogout from './hooks/useLogout';
import {getAuthFn, signInWithEmailAndPassword} from '../firebase/firebaseCrud'
import HeaderAlert from './HeaderAlert';
import ResponsiveNavBar from './ResponsiveNavBar'
import { useNavigate } from "react-router-dom";
import FirebaseImg from './firebaseimage';


const Login = () => {
    const auth = getAuthFn()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userStatus = useAuth()
    const navigate = useNavigate();
  const headerAlertRef = useRef(null)
    const MSGS = {
    'auth/email-already-in-use': 'Email is already used. Please try different one.',
    'auth/user-not-found': 'User not found. Please Sign Up with your email ID.',
    'auth/wrong-password': 'Username or Password is incorrect. Please try again.'
    }
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User is now logged in.
      headerAlertRef.current.showMsgFn('User is now logged in.')
      setPassword('')
      setEmail('')
      navigate('/')
    } catch (error) {
        if (MSGS[error.code]) {
            headerAlertRef.current.showMsgFn(`Login error! ${MSGS[error.code]}`)
        } else {
            headerAlertRef.current.showMsgFn(`Login error! ${error.code} | ${error.message}`)
        }
        setEmail('')
        setPassword('')
      // Handle login error (e.g., invalid credentials).
    }
  };
  const {handleLogout} = useLogout()
  
  return (
    (userStatus && userStatus.uid) ?
    <>
        <ResponsiveNavBar />
        <div className='form-container' style={{margin: '50px auto 50px'}}>
            <FirebaseImg />
            <div className='info-banner'>
                <p>Logged In as {userStatus.displayName || userStatus.email}</p>
            </div>
            <button className='btn btn-small' onClick={handleLogout}>Logout</button>
        </div>
    </>
    :
    <>
    {/* <ResponsiveNavBar /> */}
    <HeaderAlert ref={headerAlertRef} />
    <div className='form-container' style={{margin: '50px auto'}}>
    <FirebaseImg />
    <h2>Log In</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className='btn btn-small' onClick={handleLogin}>Login</button>
    </div>
    <p>
    <Link to="/authenticateuser/signup" style={{ textDecoration: 'underline', marginRight: '10px' }}>Sign Up</Link>
    <Link to="/" style={{ textDecoration: 'underline' }}>Home</Link>
    </p>
    </>
  );
};

export default Login;