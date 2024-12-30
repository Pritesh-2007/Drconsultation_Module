const express=require("express");
const router=express.Router();
const auth=require("../middlewear/authentication");
const {Transferamount, fetchtransaction} =require('../Controller/Transactions')
router.post("/transfer",Transferamount);
router.get("/fetchalltransaction/:id",fetchtransaction)
module.exports=router;
