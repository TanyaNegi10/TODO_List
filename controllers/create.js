// import {iid} from "./user";
const express = require("express");
const app = express();
app.use(express.json());
const userModule = require('./user');
const {nanoid}=require('nanoid');
const admin = require("firebase-admin");
const db = admin.database();

exports.createData = async (req, res) => {
  try {
      const urlParts = req.originalUrl.split('/');
      const tdid= nanoid();
      const encodedTdid = encodeURIComponent(tdid);
      // urlParts.forEach(element => {
      //     console.log(element);
      // });
      const rid = urlParts[urlParts.length-1];
      
      const { title, desc } = req.body;
      
      const userData = {
        title: req.body.title,
        desc: req.body.desc,
        uid:rid,
        tid:tdid,
      };
      
      const resp = await db.ref("users").push(userData);
      console.log("created tdid",encodedTdid);
      // res.json(resp);
      // res.redirect(`/display?title=${title}&desc=${desc}&rid=${encodeURIComponent(rid)}`);
    res.redirect(`/display?title=${title}&desc=${desc}&rid=${encodeURIComponent(rid)}`);

  } catch (err) {
    console.log(err);
  }
};

// // const db=admin.firestore();
// // exports.createData=async(req,res)=>{
// //     console.log(req.body.marks);
// //     try{
// //         const userData={
// //             name:req.body.name,
// //             marks:req.body.marks,
// //             age:req.body.age,
// //         }
// //         const resp=await db.collection("users").add(userData);
// //         res.json(resp);
// //     }
// //     catch(err){
// //         console.log(err);
// //     }
// // };
