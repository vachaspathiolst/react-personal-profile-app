import { profilesdb } from '../firebase/firebase-config';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const initialState = {
    skills: [{ id: 2}],
}
const skills = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_APP_LOADING_MASK': {
            return {
              ...state,
              status: 'loading',
            }
        }
        case 'SET_SKILLS': {
            return {
              ...state,
              status: 'idle',
              skills: action.payload,
            }
        }
        default:
            return state
    }
}

export const setAppLoadingMask = () => ({ type: 'SET_APP_LOADING_MASK' })
export const setSkills = (arr) => ({ type: 'SET_SKILLS', payload: arr})
// export const fetchSkills = () => ({ type: 'SET_SKILLS', payload: []})

// Thunk function
export const fetchSkills = () => async (dispatch) => {
    dispatch(setAppLoadingMask())
    const profileDocRef = doc(profilesdb, 'profiles', 'profile0001')
    const profileSkillsCollection = collection(profilesdb, 'profiles', 'profile0001', 'skills')
    console.log('getProfileData', profileDocRef)
    const docSnap  = await getDoc(profileDocRef)
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        // setProfile(docSnap.data())
        // setAlert(null)
        const querySnapshot = await getDocs(profileSkillsCollection);
        const arr = []
        querySnapshot.forEach((doc) => {
            arr.push({ ...doc.data(), id: doc.id })
        });
        console.log(arr)
        // setSkills(arr)
        dispatch(setSkills(arr))
    } else {
        // setProfile(null)
        // setAlert('No Document')
        // doc.data() will be undefined in this case
        console.log("No such document!");
        dispatch(setSkills([]))
    }
}


export const fetchDataMiddeware = storeAPI => next => action => {
    console.log("Middleware triggered:", action);
    if (typeof action === 'function') {
        // then call the function and pass `dispatch` and `getState` as arguments
        return action(storeAPI.dispatch, storeAPI.getState)
    }
    return next(action);
}

export default skills;