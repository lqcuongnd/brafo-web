// database here

var admin = require("firebase-admin");
var serviceAccount = require('../cn-scanner-firebase-adminsdk-d989v-9d6613c78f.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cn-scanner.firebaseio.com"
});

async function getUser(id) {
    let db = admin.firestore();
    let userRef = db.collection('NGUOIDUNG').doc(id);
    return await userRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
                return false;
            } else {
                console.log('Document data:', doc.data());
                return doc;
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
            return false;
        });
};

async function getAllUsers() {
    let db = admin.firestore();
    console.log("getting all user...");
    let usersRef = db.collection('NGUOIDUNG');
    return await usersRef.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                //console.log(doc.id, '=>', doc.get('Id'));
            });
            return snapshot;
        })
        .catch(err => {
            console.log('Error getting documents', err);
            return err;
        });
};

async function addUser(id, data) {

    let u = await getUser(id);

    if (u == true)
        return false;

    let db = admin.firestore();
    console.log("Adding user " + id + " ...");
    let setDoc = db.collection('NGUOIDUNG').doc(id);
    return await setDoc.set(data);
};

async function editUser(id, data) {
    let db = admin.firestore();
    console.log("Editting user " + id + " ...");
    let setDoc = db.collection('NGUOIDUNG').doc(id);
    return await setDoc.set(data);
};

async function countUsers() {
    let db = admin.firestore();
    return await db.collection("NGUOIDUNG").get().then(function(querySnapshot) {
        return querySnapshot.size;
    });
}

async function getAmin(id) {
    let db = admin.firestore();
    let userRef = db.collection('QUANTRIVIEN').doc(id);
    return await userRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
                return false;
            } else {
                console.log('Document data:', doc.data());
                return doc;
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
            return false;
        });
}

async function getAllReports() {
    let db = admin.firestore();
    console.log("getting all reports...");
    let usersRef = db.collection('BAOCAO');
    return await usersRef.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                //console.log(doc.id, '=>', doc.get('Id'));
            });
            return snapshot;
        })
        .catch(err => {
            console.log('Error getting documents', err);
            return err;
        });
};

async function editReport(id, data) {
    let db = admin.firestore();
    console.log("Editting report " + id + " ...");
    let setDoc = db.collection('BAOCAO').doc(id);
    return await setDoc.set(data, { merge: true });
};

module.exports = {
    getUser: getUser,
    getAllUsers: getAllUsers,
    addUser: addUser,
    editUser: editUser,
    countUsers: countUsers,
    getAmin: getAmin,
    getAllReports: getAllReports,
    editReport: editReport
}