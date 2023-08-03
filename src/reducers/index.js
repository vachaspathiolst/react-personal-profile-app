import { combineReducers } from 'redux'
import profile from './profileSlice'
import skills from './skillsSlice'
import projects from './projectsSlice'
import endorsements from './endorsementsSlice'

export default combineReducers({
  profile,
  skills,
  projects,
  endorsements
})