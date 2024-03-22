
const admin = require("firebase-admin");
// const credential = require("../fir-authentication-e46fa-firebase-adminsdk-q5opw-70c95b888b.json");

// admin.initializeApp({
//     credential: admin.credential.cert(credential),
//     databaseURL: "https://fir-authentication-e46fa-default-rtdb.firebaseio.com",
// });


const db = admin.database();

// Function to retrieve the auto-generated key based on the tid
async function getAutoKeyByTid(tid) {
    try {
        // Query the database for the transaction ID (tid)
        const snapshot = await db.ref('users').orderByChild('tid').equalTo(tid).once('value');
        
        // Extract the auto-generated key from the snapshot
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


exports.updateData=async(req,res)=>{
    try{
        
        const urlParts = req.originalUrl.split('/');        
        const tid = urlParts[urlParts.length-1];
        const rid = urlParts[urlParts.length-2];

        const autoKey = await getAutoKeyByTid(tid);
  
        const data=req.body;
        // console.log("body",data);

        await db.ref(`users/${autoKey}`).update(data);
        res.redirect(`http://localhost:3000/getData?rid=${rid}`);

    }
    catch(err)
    {
        res.status(504).json({
            message:err.message,
        })
        console.log(err);
    }
}
