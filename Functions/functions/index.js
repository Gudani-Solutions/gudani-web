const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.addCourseData = functions.https.onRequest((req, res) => {

    return cors(req, res, async () => {

        if (req.method === 'POST') {

            let data = req.body

            await admin.firestore().collection('courseData').doc().set(data)

            const query = await admin.firestore().collection('courseData').get();

            let resolvedItems = []

            await query.forEach(async (item) => {
                resolvedItems.push(item.data())
            })

            res.json({
                resolvedItems
            })
        }
    });
});

exports.getDepartments = functions.https.onRequest((req, res) => {

    return cors(req, res, async () => {

        if (req.method === 'POST') {

            let university = req.body.university

            const query = await admin.firestore().collection('courseData').where("university", "==", university).get();

            let resolvedItems = []

            await query.forEach(async (item) => {
                resolvedItems.push(item.data())
            })

            res.json({
                resolvedItems
            })
        }
    });
});

exports.getDeptByUniversity = functions.https.onCall(async (data, context) => {

    if (data.university) {

        const query = await admin.firestore().collection('courseData').where("university", "==", data.university).get();

        let resolvedItems = []

        await query.forEach(async (item) => {
            let temp = item.data()
            resolvedItems.push(temp.department)
        })

        if (resolvedItems.length > 0) {
            return {
                data: resolvedItems
            }
        } else {
            return {
                data: []
            }
        }
    } else {
        return {
            error: 'No University Data found'
        }
    }
});

exports.getCoursesByDept = functions.https.onCall(async (data, context) => {

    if (data.department && data.university) {

        const query = await admin.firestore().collection('courseData').where("university", "==", data.university).get();

        let resolvedItems = []

        await query.forEach(async (item) => {
            let temp = item.data()
            if (temp.department === data.department) {
                resolvedItems.push(temp.department)
            }
        })

        if (resolvedItems.length > 0) {
            return {
                data: resolvedItems
            }
        } else {
            return {
                data: []
            }
        }
    } else {
        return {
            error: 'No Course Data found'
        }
    }
});



exports.getCourses = functions.https.onRequest((req, res) => {

    return cors(req, res, async () => {

        if (req.method === 'POST') {

            let department = req.body.department

            const query = await admin.firestore().collection('courseData').where("department", "==", department).get();

            let resolvedItems = []

            await query.forEach(async (item) => {
                resolvedItems.push(item.data())
            })

            res.json({
                resolvedItems
            })
        }
    });
});

