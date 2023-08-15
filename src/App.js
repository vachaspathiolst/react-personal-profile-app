// import logo from './logo.svg';
import './App.css';
// import MainProfile from './components/MainProfile';
import { Outlet } from "react-router-dom";
import HeaderAlert from './components/HeaderAlert';
import { useEffect, useRef, useState } from 'react';
import {checkUserDeviceInfo}from './chatBot/utils'
function App() {
  const headerAlertRef = useRef(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    headerAlertRef.current.showMsgFn('Loading...')
    setTimeout(() => {
      if (headerAlertRef.current) { headerAlertRef.current.hideMessageFn() }
    }, 2000);
    checkUserDeviceInfo()
  }, [])
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="App">
      {
        loading && <div className="App-header">
          {/* <img src={logo} height="150" alt="logo" className="App-logo" /> */}
          <div height="150"><i className="fa fa-sun-o fa-5x fa-pulse"></i></div>
        </div>
      }
      <HeaderAlert  ref={headerAlertRef} />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
