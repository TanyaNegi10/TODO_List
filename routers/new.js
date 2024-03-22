const express=require("express");
const router=express.Router();

const {createData}=require("../controllers/create");
const {readData}=require("../controllers/read");
const { updateData } = require("../controllers/update");
const { deleteData }=require("../controllers/delete");

router.post("/create/:id",createData);
router.get("/read/:id",readData);

router.put("/update/:rid/:tid",updateData);

router.delete("/delete/:id",deleteData);

module.exports=router;