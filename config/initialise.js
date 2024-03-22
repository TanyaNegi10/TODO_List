require("dotenv").config();
const admin = require("firebase-admin");
const credential = require("../fir-authentication-e46fa-firebase-adminsdk-q5opw-70c95b888b.json");

const initial=()=>{
    admin.initializeApp({
        credential: admin.credential.cert(credential),
        databaseURL: process.env.DB_URL,
    });
}

module.exports=initial;