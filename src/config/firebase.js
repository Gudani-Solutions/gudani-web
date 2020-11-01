import * as firebase from 'firebase';
import ENV from '../env';

const config = {
    apiKey: ENV.apiKey,
    authDomain: ENV.authDomain,
    databaseURL: ENV.databaseURL,
    projectId: ENV.projectId,
    storageBucket: ENV.storageBucket,
    messagingSenderId: ENV.messagingSenderId
}

firebase.initializeApp(config);

export const firestore = firebase.firestore()
export const database = firebase.database
export const storage = firebase.storage
export const functions = firebase.functions