const bcrypt=require("bcrypt");
const {setUser}=require("../services/auth")
const {v4:uuidv4}=require("uuid");
const User=require("../models/userModel");

exports.handleSignupRequest=async(req,res)=>{
    try{
        const rid=uuidv4().toString();
        const {name,email,password}=req.body;
        const hash=await bcrypt.hash(password,10);
        const result=await User.create({name,email,password:hash,mapid:rid});

        console.log(result);
        if(result!=null)
        {
            res.redirect("http://localhost:3000/create/"+rid);
            res.json({rid});
        }else{
            res.status(503).json({
                message:"some error",
            });
            
        }
        console.log("rid is "+rid);

        module.exports=rid;
    }
    catch(err)
    {
        console.log(err);
        
    }

};

exports.handleLoginRequest=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});

        if(!user)
        {
            return res.status(402).json({
                message:"Invalid email",
            });
        }

        const isValidPassword=await bcrypt.compare(password,user.password);
        if(!isValidPassword)
        {
            return res.status(403).json({
                message:"Invalid password",
            });
        }
         const id=user.mapid;
        const token=setUser(user);
        res.cookie("uid",token);

        // window.location.href=`http://localhost:3000/getData?rid=${id}`;
        res.redirect(`http://localhost:3000/getData?rid=${id}`);
    }
    catch(err)
    {
        console.log(err);
    }
}