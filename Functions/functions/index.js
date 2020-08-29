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


