import { profilesdb } from '../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const initialState = {
    status: '',
    endorsements: []
}
const endorsements = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_APP_LOADING_MASK': {
            return {
              ...state,
              status: 'loading',
            }
        }
        case 'SET_ENDORSEMENTS': {
            return {
              ...state,
              status: 'idle',
              endorsements: action.payload,
            }
        }
        default:
            return state
    }
}

export const setAppLoadingMask = () => ({ type: 'SET_APP_LOADING_MASK' })
export const setEndorsements = (arr) => ({ type: 'SET_ENDORSEMENTS', payload: arr})
// export const fetchSkills = () => ({ type: 'SET_SKILLS', payload: []})

// Thunk function

export const fetchEndorsements = () => async (dispatch) => {
    const profileEndorsementsCollection = collection(profilesdb, 'profiles', 'profile0001', 'endorsements')
    const querySnapshot = await getDocs(profileEndorsementsCollection);
    const arr = []
    querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id })
    });
    console.log(arr)
    setEndorsements(arr)
        dispatch(setEndorsements(arr))
}

// export const fetchDataMiddeware = storeAPI => next => action => {
//     console.log("Middleware triggered:", action);
//     if (typeof action === 'function') {
//         // then call the function and pass `dispatch` and `getState` as arguments
//         return action(storeAPI.dispatch, storeAPI.getState)
//     }
//     return next(action);
// }

export default endorsements;