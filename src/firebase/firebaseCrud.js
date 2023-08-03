import {profilesdb, storageRef} from './firebase-config'
import {collection, addDoc} from 'firebase/firestore';
import { ref, getDownloadURL } from "firebase/storage";

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
    postVisitorInfo
}