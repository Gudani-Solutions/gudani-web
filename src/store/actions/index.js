import { firestore } from '../../config/firebase'
import firebase from 'firebase'
import { orderBy } from 'lodash'
import { getCourses } from './course'
import { getCoursesData } from './dataManagement'
import { getAssessments } from './assessment'

export const sync = () => {
    return async (dispatch, getState) => {
        try {

            let { user } = getState()

            if (user.role === 'Admin') {
                await dispatch(getCoursesData())
            }
            if (user.role === 'Assessor' || user.role === 'Student' ) {
                await dispatch(getCourses())
                await dispatch(getAssessments())
            }

        } catch (e) {
            console.log(e.message)
        }
    }
}

