const Module = require("module");
const mongoose=require("mongoose");
const WalletSchema=new mongoose.Schema({
    Amount:{type:Number},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }, // Reference to User});
})
const Wallet=mongoose.model('Wallet',WalletSchema);
module.exports=Wallet;