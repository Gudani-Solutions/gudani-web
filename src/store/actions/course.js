import { firestore } from '../../config/firebase'
import firebase from 'firebase'
import { orderBy } from 'lodash'
import uuid from 'uuid'

export const createCourse = (formData) => {
    return async (dispatch, getState) => {
        try {
            let { user } = getState()

            const newCourse = {
                uid: uuid.v4(),
                assessorUid: user.uid,
                students: [],
                assessments: [],
                announcements: [],
                photo: [],
                ...formData
            }

            await firestore.collection('courses').doc(newCourse.uid).set(newCourse)
            await dispatch(getCourses())

            return true
        } catch (e) {
            console.log(e.message)
            return false
        }
    }
}

export const editCourse = (formData) => {
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

            await firestore.collection('courses').doc(updatedCourse.uid).update({
                ...updatedCourse
            })

            await dispatch(getCourses())

            return true
        } catch (e) {
            console.log(e.message)
            return false
        }
    }
}

export const addStudent = (studentID, courseUid) => {
    return async (dispatch, getState) => {
        try {

            await firestore.collection('courses').doc(courseUid).update({
                students: firebase.firestore.FieldValue.arrayUnion(studentID),
            })

            dispatch(getCourses())

            return true
        } catch (e) {
            console.log(e.message)
            return false
        }
    }
}

export const getCourses = () => {
    return async (dispatch, getState) => {
        try {
            let { uid } = getState().user

            let resolvedItems = []

            const query = await firestore.collection('courses').where('assessorUid', '==', uid).get()

            query.forEach(async (item) => {
                resolvedItems.push(item.data())
            })

            dispatch({ type: 'UPDATE_COURSES', payload: orderBy(resolvedItems, 'date', 'desc') })

        } catch (e) {
            console.log(e.message)
        }
    }
}

export const deleteCourse = (formData) => {
    return async (dispatch, getState) => {
        try {
            let { course } = getState()

            course.courses.splice(formData.id, 1)

            dispatch({ type: 'UPDATE_COURSES', payload: course.courses })

            await firestore.collection('courses').doc(formData.id).delete()

            dispatch(getCourses())

            return true
        } catch (e) {
            console.log(e.message)
            return false
        }
    }
}