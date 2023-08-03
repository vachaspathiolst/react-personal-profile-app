// import React, { useEffect, useRef, useState } from 'react';
import React from 'react';
// import { profilesdb } from '../firebase/firebase-config';
// import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import ResponsiveNavBar from './ResponsiveNavBar'

import { useSelector } from 'react-redux'
// import { fetchSkills } from '../reducers/skillsSlice';
const skillsSelector = state => state.skills
export default function SkillsPage () {
    // const [profile, setProfile] = useState(null)
    // const [skills, setSkills] = useState([])
    const {skills} = useSelector(skillsSelector)
    // const [alert, setAlert] = useState(null)
    // const navigate = useNavigate();

    // const getProfileData = async () => {
    //     const profileDocRef = doc(profilesdb, 'profiles', 'profile0001')
    //     const profileSkillsCollection = collection(profilesdb, 'profiles', 'profile0001', 'skills')
    //     console.log('getProfileData', profileDocRef)
    //     const docSnap  = await getDoc(profileDocRef)
    //     if (docSnap.exists()) {
    //         console.log("Document data:", docSnap.data());
    //         // setProfile(docSnap.data())
    //         setAlert(null)
    //         const querySnapshot = await getDocs(profileSkillsCollection);
    //         const arr = []
    //         querySnapshot.forEach((doc) => {
    //             arr.push({ ...doc.data(), id: doc.id })
    //         });
    //         console.log(arr)
    //         setSkills(arr)
    //         // dispatch(setSkills())
    //     } else {
        //         // setProfile(null)
        //         setAlert('No Document')
        //         // doc.data() will be undefined in this case
        //         console.log("No such document!");
        //     }
        // }
    // const dispatch = useDispatch()
    // dispatch(setSkills({}))
    // const getSkills = () =>  {
    //     dispatch(setSkills())
    // }
    // getSkills()
    // useEffect(() => {
    //     getSkills()
    // }, [])

    // if (alert !== null) {
    //     return <>
    //     Alert: {alert}
    //     </>
    // }
    // const dispatch = useDispatch()
    // dispatch(fetchSkills())
    return (
        <>
        <ResponsiveNavBar back />
        <div className='app-dark-bg navbar-top-margin' style={{maxWidth: '100%', overflow: 'auto'}}>
        <h5 style={{color: '#fff', marginBottom: '5px', marginTop: '5px'}}>Skills</h5>
            <table>
                <thead>
                    <tr>
                    <th>Skill</th>
                    <th>Version / Proficiency</th>
                    <th>Experience in Years</th>
                    </tr>
                </thead>
                <tbody>
                {
                skills && skills.map &&
                skills.map(item => {
                    return <>
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.specification}</td>
                        <td>{item.experience_years}</td>
                    </tr>
                    <tr key={`${item.id}-notes`}>
                        <td colspan="3">{item.notes}</td>
                    </tr>
                    </>
                })
                }
                </tbody>
            </table>
        </div>
        </>
    )
}