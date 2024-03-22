const express=require("express");
const router=express.Router();

const {
    handleSignupRequest,
    handleLoginRequest,
}=require("../controllers/user");

router.post("/signup",handleSignupRequest);
router.post("/login",handleLoginRequest);

module.exports=router;