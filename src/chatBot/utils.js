// import {postDeviceInfo} from '../firebase/firebaseCrud'

export const checkUserDeviceInfo = function  () {
    const deviceInfo = {
        deviceName: window.navigator.userAgent,
        devicePixelsRatio: window.devicePixelRatio,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        browser: window.navigator.userAgent,
    };
    console.log(deviceInfo)
    // postDeviceInfo (deviceInfo)  //
}
export default {
}