const {getUser}=require("../services/auth");
exports.restrictUser=async(req,res,next)=>{
    const id=req.cookies?.uid;
    console.log(id)
    if(!id){
        res.status(402).send("Unauthorized in auth.js1");
        return;
    }

    const user=getUser(id);
    console.log(user);

    if(!user){
        res.status(402).send("Unauthorized in auth.js2");
        return;
    }

    req.user=user;
    next();
};

exports.checkAuth=async(req,res,next)=>{
    const id=req.cookies?.uid;
    const user=getUser(id);

    req.user=user;
    next();
};