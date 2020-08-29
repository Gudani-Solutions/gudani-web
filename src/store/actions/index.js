import { firestore } from '../../config/firebase'
import firebase from 'firebase'
import { orderBy } from 'lodash'
import { getCourses } from './course'

export const sync = () => {
    return async (dispatch, getState) => {
        try {
            await dispatch(getCourses())
        } catch (e) {
            console.log(e.message)
        }
    }
}

