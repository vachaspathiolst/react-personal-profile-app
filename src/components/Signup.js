import '../App.css';
import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { getAuthFn, createUserWithEmailAndPassword } from '../firebase/firebaseCrud'
import HeaderAlert from './HeaderAlert';
import ResponsiveNavBar from './ResponsiveNavBar'
import useLogout from './hooks/useLogout';
import useAuth from './hooks/useAuth ';
import FirebaseImg from './firebaseimage';

const Signup = () => {
    const auth = getAuthFn()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userStatus = useAuth()
    const { handleLogout } = useLogout()
    const headerAlertRef = useRef(null)
    const MSGS = {
        'auth/email-already-in-use': 'Email is already used. Please try different one.'
    }

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // New user is now signed up.
      headerAlertRef.current.showMsgFn('New user is now signed up.')
      setPassword('')
      setEmail('')
    } catch (error) {
        if (MSGS[error.code]) {
            headerAlertRef.current.showMsgFn(`signup error! ${MSGS[error.code]}`)
        } else {
            headerAlertRef.current.showMsgFn(`signup error! ${error.code} | ${error.message}`)
        }
        setPassword('')
        setEmail('')
      // Handle signup error (e.g., email already exists).
    }
  };
  return (
    (userStatus && userStatus.uid) ?
    <>
        <ResponsiveNavBar />
        <div className='form-container' style={{margin: '50px auto'}}>
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
        <h2>Sign Up</h2>
      <input
        className='input'
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
      <button className='btn btn-small' onClick={handleSignup}>Signup</button>
    </div>
    <Link to="/authenticateuser/login" style={{ textDecoration: 'underline', marginRight: '10px'}}>Login</Link>
    <Link to="/" style={{ textDecoration: 'underline' }}>Home</Link>
    </>
  );
};

export default Signup;