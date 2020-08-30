import { firestore } from '../../config/firebase'
import { orderBy } from 'lodash'
import uuid from 'uuid'

export const createCourseData = (formData) => {
    return async (dispatch, getState) => {
        try {
            let { user } = getState()

            const newCourse = {
                uid: uuid.v4(),
                university: user.institution,
                department: formData.department,
                title: formData.title,
                code: formData.code,
                description: formData.description,
                photo: ''
            }

            await firestore.collection('courseData').doc(newCourse.uid).set(newCourse)
            await dispatch(getCoursesData())

            return true
        } catch (e) {
            console.log(e.message)
            return false
        }
    }
}

export const editCourseData = (formData) => {
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

            await firestore.collection('courseData').doc(updatedCourse.uid).update({
                ...updatedCourse
            })

            await dispatch(getCoursesData())

            return true
        } catch (e) {
            console.log(e.message)
            return false
        }
    }
}

export const getCoursesData = () => {
    return async (dispatch, getState) => {
        try {
            let { institution } = getState().user

            let resolvedItems = []

            const query = await firestore.collection('courseData').where('university', '==', institution).get()

            query.forEach(async (item) => {
                resolvedItems.push(item.data())
            })

            dispatch({ type: 'UPDATE_COURSEDATA', payload: orderBy(resolvedItems, 'date', 'desc') })

        } catch (e) {
            console.log(e.message)
        }
    }
}

export const deleteCourseData = (uid) => {
    return async (dispatch, getState) => {
        try {

            await firestore.collection('courseData').doc(uid).delete()
            dispatch(getCoursesData())

            return true
        } catch (e) {
            console.log(e.message)
            return false
        }
    }
}