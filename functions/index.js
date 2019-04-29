const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
var FieldValue = require("firebase-admin").firestore.FieldValue;
admin.initializeApp();

    //when adding or updating task
exports.modifyTask = functions.firestore
    .document('people/{userID}/tasks/{taskID}')
    .onWrite((change, context) => {
        // Get an object with the current document value.
        // If the document does not exist, it has been deleted.
        const document = change.after.exists ? change.after.data() : null;
        
        var userID = context.params.userID;//get user id
        var db = admin.firestore();//assign firestore
        let count = 0;

        //console out the time
        console.log(context.timestamp());

        // get the week
        var dateWeek = context.timestamp();

        //check if Daily taskTotal for today exist

        //if not add one

        //get task status before
        var tB = change.before.data();
        var taskBefore = tB['taskStatus'];

        //get task status after
        var tA = change.after.data();
        var taskAfter = tA['taskStatus'];
        //compare task status
        if (taskBefore !== taskAfter){
            if(taskAfter === "notDone"){
                var dailyTaskRef = db.collection(`people/${userID}/DailyTaskTotal`).doc(dateWeek);
                db.runTransaction((trans)=>{
                    return trans.get(dailyTaskRef).then((dtDoc) => {
                        // eslint-disable-next-line promise/always-return
                        if (!dtDoc.exists) {
                            console.log("Document does not exist!");
                        }
                
                        var newNotDone = dtDoc.data().Todo + 1;
                        var newDone = dtDoc.data().Done - 1;
                        transaction.update(sfDocRef, { Todo: newNotDone, Done: newDone });
                    });
                // eslint-disable-next-line promise/always-return
                }).then(()=> {
                    console.log("Transaction successfully committed!");
                }).catch((error)=> {
                    console.log("Transaction failed: ", error);
                });

            }else{
                var dailyTaskRef2 = db.collection(`people${userID}DailyTaskTotal`).doc(dateWeek);
                db.runTransaction((trans)=>{
                    return trans.get(dailyTaskRef2).then((dtDoc) => {
                        // eslint-disable-next-line promise/always-return
                        if (!dtDoc.exists) {
                            console.log("Document does not exist!");
                        }
                
                        var newNotDone = dtDoc.data().Todo - 1;
                        var newDone = dtDoc.data().Done + 1;
                        transaction.update(sfDocRef, { Todo: newNotDone, Done: newDone });
                    });
                // eslint-disable-next-line promise/always-return
                }).then(()=> {
                    console.log("Transaction successfully committed!");
                }).catch((error)=> {
                    console.log("Transaction failed: ", error);
                });
            }
            console.log(taskAfter['taskStatus']);
            console.log(taskBefore['taskStatus']);
        }
        
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
