const Module = require("module");
const mongoose=require("mongoose");
const TransactionSchema=new mongoose.Schema({
    fromWalletId:String,
    toWalletId:String, 
       Amount:{
        type:Number
       },
       discountPercent:{
        type:Number
       }

});
const Transactions=mongoose.model('Transcations',TransactionSchema);
module.exports=Transactions;