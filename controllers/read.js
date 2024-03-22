const express = require("express");

// const id=require("./user");
const admin = require("firebase-admin");
// const credential = require("../fir-authentication-e46fa-firebase-adminsdk-q5opw-70c95b888b.json");

// admin.initializeApp({
//     credential: admin.credential.cert(credential),
//     databaseURL: "https://fir-authentication-e46fa-default-rtdb.firebaseio.com",
// });

const db = admin.database();
exports.readData = async (req, res) => {
  try {
    // const result=await db.ref("users").once("value");
    const id = req.query.rid;
    // console.log("id", id);
    // const result = await db.ref("users").child(id).once("value");
    const result = await db.ref("users").orderByChild("uid").equalTo(id).once("value");
    if (result.exists()) {
      const arr = [];
      result.forEach((document) => {
        arr.push({
          id: document.key,
          ...document.val(),
        });
        // console.log(document.val());
      });
      res.render("display", { data: arr });
    } else {
      console.log("Document not found");
      res.render("display", { data: [] }); // or handle accordingly
    }
  } catch (err) {
    console.log("cannot read");
    res.status(505).json({
      message: err.message,
    });
    console.log(err);
  }
};
