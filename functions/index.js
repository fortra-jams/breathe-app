const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
var FieldValue = require("firebase-admin").firestore.FieldValue;
admin.initializeApp();

function formatDate(date) {
    var d = new Date(date),
        month = String(d.getMonth() + 1),
        day = String(d.getDate()),
        year = (d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day,month,year].join('-');
}

exports.debugFunc = functions.firestore
    .document('people/{userID}/tasks/{taskID}')
    .onCreate((snap, context) => {
        var dateWeek = snap.data()['date'];//get date from task
        console.log(formatDate(dateWeek.toDate()));

        var userID = context.params.userID;//get user id
        console.log(userID);
        var dw = formatDate(dateWeek.toDate());
        console.log(dw);

         //compare with daily task burden

         var a2 = snap.data()['taskDifficulty'];
         //var b2 = snap.before.data()['taskDifficulty'];

         //when adding
         //check whether have similar date in daily burden total
         var db = admin.firestore();//assign firestore

        var dailyTaskRef = db.collection(`people/${userID}/DailyBurdenTotal`).doc(dw);
        console.log(dailyTaskRef);
        console.log(dailyTaskRef.exists);
        
        dailyTaskRef.get().then((doc)=>{
            console.log(doc.exists);
            if (!doc.exists){
                console.log("dailytaskRefNot");
    
                //var a = snap.after.data()['taskDifficulty'];
                if(a2 === "Easy"){
                    console.log("EASY WORKING SHUD NOT");
                    dailyTaskRef.set({
                        
                        Easy:1,
                        Medium:0,
                        Hard:0
                    });
                }else if(a2 === "Medium"){
                    console.log("MED WORKING SHUD NOT");
    
                    dailyTaskRef.set({
                        Easy:0,
                        Medium:1,
                        Hard:0
                    });
                }else if(a2 === "Hard"){
                    console.log("HARD WORKING SHUD NOT");
                    dailyTaskRef.set({
                        Easy:0,
                        Medium:0,
                        Hard:1
                    });
                }
                
            }
    });

});

exports.debugFunc2 = functions.firestore
    .document('people/{userID}/tasks/{taskID}')
    .onWrite((change, context) => {
        var dateWeek = change.after.data()['date'];//get date from task
        console.log(formatDate(dateWeek.toDate()));

        var userID = context.params.userID;//get user id
        console.log(userID);
        var dw = formatDate(dateWeek.toDate());
        console.log(dw);

         //compare with daily task burden

         var a2 = change.after.data()['taskDifficulty'];
         var b2 = change.before.data()['taskDifficulty'];

         var db = admin.firestore();//assign firestore

         //when adding
         //check whether have similar date in daily burden total
        var dailyTaskRef = db.collection(`people/${userID}/DailyBurdenTotal`).doc(dw);
        console.log(dailyTaskRef);
        console.log(dailyTaskRef.exists);

        dailyTaskRef.get().then((doc)=>{
            console.log(doc.exists);
            if (doc.exists){
                
                //var a = change.after.data()['taskDifficulty'];
                //var b = change.before.data()['taskDifficulty'];
                if(a2 != b2 ){
                    console.log("Before After Not Same");
                    if(a2 === "Easy") {
                        console.log("After Easy");
    
                    db.runTransaction((trans)=>{
                        return trans.get(doc).then((dtDoc) => {
                            if(!dtDoc.exists){
                                console.log("Document exist");
                            }
    
                            var newEasy = dtDoc.data().Easy + 1;
                            var newMedium = dtDoc.data().Medium;  
                            var newHard = dtDoc.data().Hard;
    
    
                            if(b2 === "Medium"){
                                console.log("Before medium 1");
                                newMedium = dtDoc.data().Medium - 1;
                                console.log("Before medium 2");
    
                            }else if( b2 === "Hard"){
                                newHard = dtDoc.data().Hard - 1;
    
                            }
    
                            trans.update(doc, {Easy: newEasy, Medium: newMedium, Hard: newHard})
                        });
    
    
                        
    
                    });
                
                    }else if(a2 === "Medium"){
                        console.log("After Medium");

                        db.runTransaction((trans)=>{
                            return trans.get(dailyTaskRef).then((dtDoc) => {
                                if(!dtDoc.exists){
                                    console.log("Document exist");
                                }
        
                                var newEasy = dtDoc.data().Easy;
                                var newMedium = dtDoc.data().Medium + 1;  
                                var newHard = dtDoc.data().Hard;
        
        
                                if(b2 === "Easy"){
                                    newEasy = dtDoc.data().Easy - 1;
                                }else if( b2 === "Hard"){
                                    newHard = dtDoc.data().Hard - 1;
        
                                }
        
                                trans.update(dailyTaskRef, {Easy: newEasy, Medium: newMedium, Hard: newHard})
                            });
        
        
                            
        
                        });
                    
                    }else if(a2 === "Hard"){
                        console.log("After Hard");

                        db.runTransaction((trans)=>{
                            return trans.get(dailyTaskRef).then((dtDoc) => {
                                if(!dtDoc.exists){
                                    console.log("Document exist");
                                }
        
                                var newEasy = dtDoc.data().Easy;
                                var newMedium = dtDoc.data().Medium;  
                                var newHard = dtDoc.data().Hard + 1;
        
        
                                if(b2 === "Easy"){
                                    newEasy = dtDoc.data().Easy - 1;
                                }else if( b2 === "Medium"){
                                    newMedium = dtDoc.data().Medium - 1;
        
                                }
        
                                trans.update(dailyTaskRef, {Easy: newEasy, Medium: newMedium, Hard: newHard})
                            });
        
        
                            
        
                        });
                    
                    }
                }else{
                    if(a2 === "Easy"){
                    var newEasy = dtDoc.data().Easy + 1;
                    var newMedium = dtDoc.data().Medium;  
                    var newHard = dtDoc.data().Hard;
                    trans.update(dailyTaskRef, {Easy: newEasy, Medium: newMedium, Hard: newHard})
                        }else if(a2 ==="Medium"){
                            var newEasy = dtDoc.data().Easy ;
                            var newMedium = dtDoc.data().Medium + 1;  
                            var newHard = dtDoc.data().Hard;
                            trans.update(dailyTaskRef, {Easy: newEasy, Medium: newMedium, Hard: newHard})
                        }else if(a2 === "Hard"){
                            var newEasy = dtDoc.data().Easy ;
                            var newMedium = dtDoc.data().Medium;  
                            var newHard = dtDoc.data().Hard + 1;
                            trans.update(dailyTaskRef, {Easy: newEasy, Medium: newMedium, Hard: newHard})
                        }
    
                
                    }
    
            }


        });
        
         //if dont have add one

         //else update




         //when updating
         //check difficulty before and after

         //if not same 

            //check whether have similar date in daily burden total

            //if dont have add one

            //else update
});

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
        console.log(change.data()['date']);

        // get the week
        var dateWeek = change.data()['date'];

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
                var dailyTaskRef = db.collection(`people/${userID}/DailyTaskTotal`).collection(dateWeek);
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
