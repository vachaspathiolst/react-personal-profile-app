// import logo from './logo.svg';
import './App.css';
// import MainProfile from './components/MainProfile';
import { Outlet } from "react-router-dom";
import HeaderAlert from './components/HeaderAlert';
import { useEffect, useRef } from 'react';
// import {checkUserDeviceInfo}from './chatBot/utils'
function App() {
  const headerAlertRef = useRef(null)
  // const [loading, setLoading] = useState(false)
  // useEffect(() => {
  //   // setLoading(true);
  //   setTimeout(() => {
  //     // setLoading(false);
  //   }, 2000);
  // }, []);

  useEffect(() => {
    headerAlertRef.current.showMsgFn('Loading...')
    setTimeout(() => {
      if (headerAlertRef.current) { headerAlertRef.current.hideMessageFn() }
    }, 2000);
    // checkUserDeviceInfo()
  }, [])
  
  return (
    <div className="App">
      {/* {
        loading && <div className="App-header">
          <div height="150"><i className="fa fa-sun-o fa-5x fa-pulse"></i></div>
        </div>
      } */}
      <HeaderAlert  ref={headerAlertRef} />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
