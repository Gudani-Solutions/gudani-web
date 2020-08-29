import { combineReducers } from 'redux'
import user from './user'
import ui from './ui'
import course from './course'
import dataManagement from './dataManagement'

export default combineReducers({
    user,
    ui,
    course,
    dataManagement
});