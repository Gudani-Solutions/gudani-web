import firebase from 'firebase'
import { firestore } from '../../config/firebase'
import { orderBy } from 'lodash'
import uuid from 'uuid'

export const register = (formData) => {
    return async (dispatch) => {
        try {

            const response = await firebase.auth().createUserWithEmailAndPassword(formData.email, formData.pwd)

            if (response && response.user.uid) {
                const newUser = {
                    uid: response.user.uid,
                    photo: '',
                    courses: [],
                    assessments: [],
                    isVerified: false,
                    token: '',
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    email: formData.email,
                    role: formData.role,
                    institution: formData.institution,
                    institutionID: formData.institutionID
                }

                await firestore.collection('users').doc(newUser.uid).set(newUser)
                dispatch({ type: 'UPDATE_USER', payload: newUser })
            } else {

                // something went wrong
            }
            return true
        } catch (e) {
            console.log(e.message)
            return false
        }
    }
}

export const login = (formData) => {
    return async (dispatch) => {
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(formData.email, formData.pwd)

            if (response) {
                const userQuery = await firestore.collection('users').doc(response.user.uid).get()
                if (userQuery.exists) {
                    let user = userQuery.data()
                    user.isAuthenticated = true
                    user.usNewuser = false
                    await dispatch({ type: 'UPDATE_USER', payload: user })
                    return true
                } else {
                    // user does not exist in database
                    return false
                }
            } else {
                // user login has failed
                return false
            }
        } catch (e) {
            console.log(e.message)
            return false
        }
    }
}

export const signOut = (formData) => {
    return async (dispatch) => {
        try {
            await firebase.auth().signOut()

            dispatch({
                type: 'UPDATE_USER', payload: {
                    uid: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    role: '',
                    photo: '',
                    univerisity: '',
                    courses: [],
                    assessments: [],
                    isVerified: false,
                    isAuthenticated: false,
                    token: '',
                }
            })

        } catch (e) {
            console.log(e.message)
            return false
        }
    }
}

export const editUser = (formData) => {
    return async (dispatch, getState) => {
        try {

            const updateUser = {
                updatedDate: new Date().getTime(),
                ...formData,
            }

            dispatch({ type: 'UPDATE_USER', payload: updateUser })

            await firestore.collection('users').doc(updateUser.uid).set(updateUser)

            return true
        } catch (e) {
            console.log(e.message)
            return false
        }
    }
}

export const deleteUser = (uid) => {
    return async (dispatch, getState) => {
        try {

            dispatch({
                type: 'UPDATE_USER', payload: {
                    uid: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    role: '',
                    photo: '',
                    univerisity: '',
                    courses: [],
                    assessments: [],
                    isVerified: false,
                    isAuthenticated: false,
                    token: '',
                }
            })

            await firestore.collection('user').doc(uid).delete()

            return true
        } catch (e) {
            console.log(e.message)
            return false
        }
    }
}
