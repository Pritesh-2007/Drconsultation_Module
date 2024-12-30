const express=require("express");
const router=express.Router();
const auth=require("../middlewear/authentication");
const { Addwallet, updateWallet, walletbalance, IsWallet, Walletdetails } =require('../Controller/Wallet')
router.post("/Addwallet",Addwallet);
router.put("/updatewallet/:uid",updateWallet);
router.get("/walletbalance/:uid",walletbalance);
router.get("/Iswallet/:uid",IsWallet);
router.get("/walletdetails/:uid",Walletdetails);

module.exports=router;
