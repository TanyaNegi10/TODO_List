const mongoose=require("mongoose");
require("dotenv").config();

const dbconnect=()=>mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    console.log("Database connected");
})
.catch((err)=>{
    console.log(err);
})
module.exports=dbconnect;