import { firestore } from '../../config/firebase'
import firebase from 'firebase'
import { orderBy } from 'lodash'
import uuid from 'uuid'

export const createAssessment = (formData, courseUid) => {
    return async (dispatch, getState) => {
        try {
            let { user } = getState()

            alert(courseUid)

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
                uid: formData.uid,
                university: formData.university,
                department: formData.department,
                title: formData.title,
                code: formData.code,
                description: formData.description,
                photo: formData.photo,
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
            let { uid } = getState().user

            let resolvedItems = []

            const query = await firestore.collection('assessments').where('courseUid', '==', uid).get()

            query.forEach(async (item) => {
                resolvedItems.push(item.data())
            })

            dispatch({ type: 'UPDATE_ASSESSMENT', payload: orderBy(resolvedItems, 'date', 'desc') })

        } catch (e) {
            console.log(e.message)
        }
    }
}

export const deleteAssessment = (formData) => {
    return async (dispatch, getState) => {
        try {
            let { course } = getState()

            course.courses.splice(formData.id, 1)

            dispatch({ type: 'UPDATE_COURSES', payload: course.courses })

            await firestore.collection('courses').doc(formData.id).delete()

            dispatch(getAssessments())

            return true
        } catch (e) {
            console.log(e.message)
            return false
        }
    }
}