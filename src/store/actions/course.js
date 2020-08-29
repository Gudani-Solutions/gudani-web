import { firestore } from '../../config/firebase'
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
            let { course } = getState()

            const newCourse = {
                updatedAt: new Date().getTime(),
                ...formData,
            }

            let newCourses = course.courses.map(item => {
                if (item.id === newCourse.id) {
                    item = newCourse
                } return item
            })

            dispatch({ type: 'UPDATE_COURSES', payload: orderBy(newCourses, 'date', 'desc') })
            await firestore.collection('courses').doc(newCourse.id).update({
                ...newCourse
            })

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