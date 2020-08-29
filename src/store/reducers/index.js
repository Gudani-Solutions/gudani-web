import { combineReducers } from 'redux'
import user from './user'
import ui from './ui'
import course from './course'

export default combineReducers({
    user,
    ui,
    course
});