import { profilesdb } from '../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const initialState = {
    projects: []
}
const projects = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_APP_LOADING_MASK': {
            return {
              ...state,
              status: 'loading',
            }
        }
        case 'SET_PROJECTS': {
            return {
              ...state,
              status: 'idle',
              projects: action.payload,
            }
        }
        default:
            return state
    }
}

export const setAppLoadingMask = () => ({ type: 'SET_APP_LOADING_MASK' })
export const setProjects = (arr) => ({ type: 'SET_PROJECTS', payload: arr})
// export const fetchSkills = () => ({ type: 'SET_SKILLS', payload: []})

// Thunk function

export const fetchProjects = () => async (dispatch) => {
    const profileEndorsementsCollection = collection(profilesdb, 'projects')
        const querySnapshot = await getDocs(profileEndorsementsCollection);
        const arr = []
        querySnapshot.forEach((doc) => {
            arr.push({ ...doc.data(), id: doc.id })
        });
        arr.sort((a, b) => {
            // console.log(a.sno, b.sno)
            // console.log( parseInt(b.sno), parseInt(a.sno))
            return parseInt(b.sno) < parseInt(a.sno)
        })
        dispatch(setProjects(arr))
}

// export const fetchDataMiddeware = storeAPI => next => action => {
//     console.log("Middleware triggered:", action);
//     if (typeof action === 'function') {
//         // then call the function and pass `dispatch` and `getState` as arguments
//         return action(storeAPI.dispatch, storeAPI.getState)
//     }
//     return next(action);
// }

export default projects;