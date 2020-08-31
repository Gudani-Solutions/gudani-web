import { firestore } from '../../config/firebase'
import firebase from 'firebase'
import { orderBy } from 'lodash'
import uuid from 'uuid'

export const createAssessment = (formData, courseUid) => {
    return async (dispatch, getState) => {
        try {
            let { user } = getState()

            const newItem = {
                uid: uuid.v4(),
                courseUid: courseUid,
                assessorUid: user.uid,
                university: user.institution,
                ...formData
            }

            await firestore.collection('assessments').doc(newItem.uid).set(newItem)
            await firestore.collection('courses').doc(courseUid).update({
                assessments: firebase.firestore.FieldValue.arrayUnion(newItem.uid),
            })
            await dispatch(getAssessments())

            return true
        } catch (e) {
            console.log(e.message)
            return false
        }
    }
}

export const editAssessment = (formData) => {
    return async (dispatch, getState) => {
        try {
            const updatedCourse = {
                updatedAt: new Date().getTime(),
                ...formData
            }

            await firestore.collection('assessments').doc(updatedCourse.uid).update({
                ...updatedCourse
            })
            await dispatch(getAssessments())
            return true
        } catch (e) {
            console.log(e.message)
            return false
        }
    }
}

export const getAssessments = () => {
    return async (dispatch, getState) => {
        try {
            let { uid, enrolledCourses, role } = getState().user

            let resolvedItems = []
            let query = {}

            if (role === 'Assessor') {
                query = await firestore.collection('assessments').where('assessorUid', '==', uid).get()
            }
            else if (role === 'Student') {
                enrolledCourses.forEach(async item => {
                    query = await firestore.collection('assessments').where('courseUid', '==', item).get()
                })
            }

            if (query) {
                query.forEach(async (item) => {
                    resolvedItems.push(item.data())
                })

                dispatch({ type: 'UPDATE_ASSESSMENTS', payload: orderBy(resolvedItems, 'date', 'desc') })
            }
        } catch (e) {
            console.log(e.message)
        }
    }
}

export const deleteAssessment = (uid, courseUid) => {
    return async (dispatch, getState) => {
        try {

            await firestore.collection('assessments').doc(uid).delete()
            await firestore.collection('courses').doc(courseUid).update({
                assessments: firebase.firestore.FieldValue.arrayRemove(uid),
            })

            dispatch(getAssessments())
            return true
        } catch (e) {
            console.log(e.message)
            return false
        }
    }
}