import {profilesdb, storageRef} from './firebase-config'
import {collection, addDoc} from 'firebase/firestore';
import { ref, getDownloadURL, listAll } from "firebase/storage";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const isUserLogedIn = async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          return {
            username: uid,
            loggedin: true
          }
          // ...
        } else {
          // User is signed out
          // ...
          return {
            username: null,
            loggedin: false
          }
        }
      });
}
const sendMessage = async (payload) => {
    let dt = new Date()
    dt = dt.toString()
    return await addDoc(collection(profilesdb, "Messages"), {
        // message, from_email, from_name
        ...payload,
        time_stamp: dt
    }).then(() => {
        return 'SUCCESS'
    }).catch(() => {
        return 'FAILED'
    })
}
const getAuthFn = getAuth
const addSkillDoc = async (payload) => {
    /**
     * experience_years, name, notes, specification
     */
    // collection(profilesdb, 'profiles', 'profile0001', 'skills')
    let dt = new Date()
    dt = dt.toString()
    return await addDoc(collection(profilesdb, 'profiles', 'profile0001', 'skills'), {
        // message, from_email, from_name
        ...payload,
        time_stamp: dt
    }).then(() => {
        return 'SUCCESS'
    }).catch(() => {
        return 'FAILED'
    })
}

const addSkillEndorsementDoc = async (payload) => {
    /**
     * experience_years, name, notes, specification
     */
    // collection(profilesdb, 'profiles', 'profile0001', 'skills')
    let dt = new Date()
    dt = dt.toString()
    return await addDoc(collection(profilesdb, 'profiles', 'profile0001', 'endorsements'), {
        // message, from_email, from_name
        ...payload,
        time_stamp: dt
    }).then(() => {
        return 'SUCCESS'
    }).catch(() => {
        return 'FAILED'
    })
}

const getVideoFilesRef = function () {
    return ref(storageRef, 'samplevideos')
}
const listAllVideoFiles = function () {
    const ref = getVideoFilesRef()
    return listAll(ref)
}
const getDownloadUrlVideo = (filename) => {
    const refr = ref(storageRef, `samplevideos/${filename}`)
    return getDownloadURL(refr)
}
const downloadFileUrlAnchorTag = function (url) {
    const pathRef = ref(storageRef, url)
    const durl = getDownloadURL(pathRef)
    .then((resurl) => {
        // console.log('download url created')
        // const xhr = new XMLHttpRequest();
        // xhr.responseType = 'blob';
        // xhr.onload = (event) => {
        // const blob = xhr.response;
        // };
        // xhr.open('GET', resurl);
        // xhr.send();
        const link = document.createElement('a')
        link.href = resurl
        link.download = 'VachaspathiD_CV.pdf'
        link.target = '_blank'
        document.body.appendChild(link);
        link.click()
        document.body.removeChild(link);
        return 'SUCCESS'
    })
    .catch((error) => {
        // Handle any errors
        console.log(error)
        return 'FAILED'
    });
    return durl
}

const postDeviceInfo = async (payload) => {
    let dt = new Date()
    dt = dt.toString()
    return await addDoc(collection(profilesdb, "DevicesAccessed"), {
        // message, from_email, from_name
        ...payload,
        time_stamp: dt
    }).then(() => {
        return 'SUCCESS'
    }).catch(() => {
        return 'FAILED'
    })
}

const postVisitorInfo = async (payload) => {
    let dt = new Date()
    dt = dt.toString()
    return await addDoc(collection(profilesdb, "ResumeDownload"), {
        // message, from_email, from_name
        ...payload,
        time_stamp: dt
    }).then(() => {
        return 'SUCCESS'
    }).catch(() => {
        return 'FAILED'
    })
}

export {
    sendMessage,
    addSkillDoc,
    addSkillEndorsementDoc,
    downloadFileUrlAnchorTag,
    postDeviceInfo,
    postVisitorInfo,
    getAuthFn,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    isUserLogedIn,
    getVideoFilesRef,
    listAllVideoFiles,
    getDownloadUrlVideo
}