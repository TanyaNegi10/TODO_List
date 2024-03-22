const express=require("express");
const { readData } = require("../controllers/read");

const router=express.Router();

router.get("/create/:id",(req,res)=>{
    res.render("home");
})

router.get("/update/:rid/:tid",(req,res)=>{
    res.render("update");
})

router.get("/display",(req,res)=>{
    const n=req.query.title;
    const a=req.query.desc;
    const i=req.query.rid;
    const t=req.query.tdid;

    console.log("tdidddddd",t);
    res.render("new",{
        data1:n,
        data2:a,
        // data3:i,
        data3:t,
    });
});

router.get("/getData",readData);

router.get("/front",(req,res)=>{
    res.render("front");
})

router.get("/delete/:id",(req,res)=>{
    res.render("display");
})

router.get("/login",(req,res)=>{
    res.render("login");
})

router.get("/signup",(req,res)=>{
    res.render("signup");
})
module.exports=router;