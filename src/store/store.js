import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import {fetchDataMiddeware} from '../reducers/skillsSlice'

const store = createStore(rootReducer, applyMiddleware(fetchDataMiddeware))

export default store