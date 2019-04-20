const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

    
exports.modifyTask = functions.firestore
    .document('people/{userID}/tasks/{taskID}')
    .onWrite((change, context) => {
        // Get an object with the current document value.
        // If the document does not exist, it has been deleted.
        const document = change.after.exists ? change.after.data() : null;
        
        var userID = context.params.userID;//get user id
        var db = admin.firestore();//assign firestore
        let count = 0;

        //count the keys of document on collection tasks
        db.collection('people').doc(userID).collection('tasks').stream()
            .on('data', (snap) => {
                ++count;//increment count
        }).on('end', () => {
            console.log(`Total count is ${count}`);
            //set ref for which user
            var taskRef = db.collection('people').doc(userID);

            // Then return a promise of a set operation to update the count
            return taskRef.set({
                totalTask: count
            }, {merge: true});
        });

            //for debugging purpose
            console.log(`Total count is outside ${count}`);
            console.log(document);

        return null;

    });
