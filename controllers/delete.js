const express = require("express");
const app = express();
app.use(express.json());

const admin = require("firebase-admin");
// const credential = require("../fir-authentication-e46fa-firebase-adminsdk-q5opw-70c95b888b.json");

// admin.initializeApp({
//     credential: admin.credential.cert(credential),
//     databaseURL: "https://fir-authentication-e46fa-default-rtdb.firebaseio.com",
// });

const db=admin.database();
async function getAutoKeyByTid(tid) {
    try {
        // Query the database for the transaction ID (tid)
        const snapshot = await db.ref('users').orderByChild('tid').equalTo(tid).once('value');
        let autoKey = null;
        snapshot.forEach((childSnapshot) => {
            autoKey = childSnapshot.key; // Get the key associated with the tid
        });

        return autoKey;
    } catch (error) {
        console.error("Error retrieving auto key:", error);
        throw error; // Propagate the error to the caller
    }
}

exports.deleteData =async(req,res)=>{
    try{
        const id=req.params.id;
        console.log("deleteid",id);
        const autoKey = await getAutoKeyByTid(id);

        const resp=await db.ref(`users/${autoKey}`).remove();
        res.json(resp);
    }
    catch(err)
    {
        console.log(err);
    }
}