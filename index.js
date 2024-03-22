require("dotenv").config();
const express = require("express");
const app = express();
const initial=require("./config/initialise");
const {restrictUser,checkAuth}=require("./middlewares/auth");

const cookieParser=require("cookie-parser");

const path=require("path");

// const admin = require("firebase-admin");
// const credential = require("./fir-authentication-e46fa-firebase-adminsdk-q5opw-70c95b888b.json");

// admin.initializeApp({
//     credential: admin.credential.cert(credential),
//     databaseURL: "https://fir-authentication-e46fa-default-rtdb.firebaseio.com",
// });

// app.post("/signup", async (req, res) => {
//     try {
//         const user = {
//             email: req.body.email,
//             password: req.body.password,
//         };
//         const resp = await admin.auth().createUser({
//             email: user.email,
//             password: user.password,
//         });

//         res.json(resp);
//     }
//     catch (err) {
//         console.log(err);
//     }
// });

//firestore database

// const db=admin.firestore();
// app.post("/create",async(req,res)=>{
//     try{
//         const userData={
//             name:req.body.name,
//             marks:req.body.marks,
//             age:req.body.age,
//         }
//         const resp=await db.collection("users").add(userData);
//         res.json(resp);
//     }
//     catch(err){
//         console.log(err);
//     }
// })
// app.get("/getData",async(req,res)=>{
//     try{
//         const snapshot=await db.collection("users").get();
//         const arr=[];
//         snapshot.forEach((document)=>{
//             arr.push({
//                 id:document.id,
//                 ...document.data()
//             })
//         })
//         res.json(arr);
//     }
//     catch(err){
//         console.log(err);
//     }
// })

// app.put("/update/:id",async(req,res)=>{
//     try{
//         const id=req.params.id;
//         const data=req.body;
//         const resp=await db.collection("users").doc(id).update(data);
//         res.json(resp);
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// })

// app.delete("/delete/:id",async(req,res)=>{
//     try{
//         const id=req.params.id;
//         const resp=await db.collection("users").doc(id).delete();
//         res.json(resp);
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// })

//Real time database

// const db=admin.database();
// app.post("/api/v1/create", async (req, res) => {
//     try {
//         const userData = {
//             name: req.body.name,
//             marks: req.body.marks,
//             age: req.body.age,
//         }
//         const resp=await db.ref("users").push(userData);
//         res.json(resp);
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// })

// app.get("/getData",async(req,res)=>{
//     try{
//         const resp=await db.ref("users").once("value");
//         const arr=[];
//         resp.forEach((document)=>{
//             arr.push({
//                 id:document.key,
//                 ...document.val(),
//             })
//         })
//         res.json(arr);
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// })

// app.put("/update/:id",async(req,res)=>{
//     try{
//         const id=req.params.id;
//         const data=req.body;
//         const resp=await db.ref(`users/${id}`).update(data);
//         res.json(resp);
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// })

// app.delete("/delete/:id",async(req,res)=>{
//     try{
//         const id=req.params.id;
//         const resp=await db.ref(`users/${id}`).remove();
//         res.json(resp);
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// })

initial();
const staticRoutes=require("./routers/staticRoute");
const apiRoutes=require("./routers/new");
const userRoutes=require("./routers/user");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(express.static(path.join(process.cwd(),"public")));
app.use("/",staticRoutes);
app.use("/api/v1",restrictUser,apiRoutes);
app.use("/user",checkAuth,userRoutes);


const dbconnect=require("./config/dbConnect");
// const cookieParser = require("cookie-parser");
dbconnect();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});