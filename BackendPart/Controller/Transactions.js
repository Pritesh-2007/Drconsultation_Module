// routes/transferRoutes.js
const express = require('express');
const router = express.Router();
const Wallet = require('../Models/Wallet');
const Transaction=require('../Models/Transactions')
const Doctors=require('../Models/Doctors')
const User = require('../Models/Users');
exports.Transferamount=async (req, res) => {
const { fromWalletId, toWalletId, Amount } = req.body;

  try {
    // Find the wallets
    const fromWallet = await Wallet.findOne({ _id: fromWalletId });
    const toWallet = await Wallet.findOne({_id: toWalletId });

    if (!fromWallet || !toWallet) {
      return res.status(404).json({msg:'Wallet not found'});
    }

    if (fromWallet.Amount < Amount) {
      return res.status(400).json({msg:'Insufficient Balance'});
    }
// Check if this is the first transaction between the two wallets 
const transactionExists = await Transaction.findOne({ fromWalletId, toWalletId, }); 
let discountPercent=0; 
let netamount=Amount;
if (!transactionExists) {
    const discount = 10;
    netamount=Amount-Amount*discount/100
    fromWallet.Amount -=netamount
    await fromWallet.save();

    discountPercent = discount; 
} 
else 
{ 
    fromWallet.Amount -= netamount; 
    await fromWallet.save();

}

    toWallet.Amount += netamount;
    await toWallet.save();

   // Record the transaction 
   await Transaction.create({ fromWalletId, toWalletId, Amount:netamount, discountPercent, date: new Date(), });

    res.status(201).send('Transfer successful');
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
};

exports.fetchtransaction=async(req,res)=>{
  try 
  {
   let fromWalletId=req.params.id;
    const result1=await Transaction.find({fromWalletId});
    const responses = [];
    const promises = [];
    let toWalletIdarray=[];
    toWalletIdarray=result1.map((ids)=>{return(ids.toWalletId)})
    const userinfo = await Wallet.find({ _id: { $in: toWalletIdarray } }).populate('user',"Name").exec();
    return res.status(200).json({
     success:true,
     msg:'Data fetched',
     data:[result1,userinfo]
    })
  } catch (error)
  {
    res.status(500).json({
      success:false,
      msg:"Internal server Error!"
    })
  }
}