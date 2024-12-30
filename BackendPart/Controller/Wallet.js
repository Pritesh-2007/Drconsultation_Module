const Wallet=require('../Models/Wallet');
exports.IsWallet=async(req,res)=>{
    const uid=req.params.uid;
    let result=await Wallet.findOne({user:uid});
    try {
        if(!result)
            {
                return res.json({
                    haveWallet:false
                });
            }  
            return res.json({
                haveWallet:true
            })
        
    } catch (error) {
        return res.json({
           msg:error.message
        })
    }
 
}
exports.Walletdetails=async(req,res)=>{
    try {
        const uid=req.params.uid;
        let result= await Wallet.findOne({user:uid});
        res.status(200).json({
            msg:'wallet info',
            data:result
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            msg:error.messsage
        })
    }
 
}
exports.Addwallet=async (req,res)=>{
    try {
        const{Amount,user}=req.body;
        let result= await Wallet.create({Amount,user});
        res.status(201).json({
            msg:'Wallet Created',
            data:result
        });

    } catch (error) {
        res.status(500).json({
            msg:error.messsage
        })
    }
}
exports.walletbalance=async (req,res)=>{
    try {
        const uid=req.params.uid;
        let result= await Wallet.findOne({user:uid});
        res.status(200).json({
            msg:'wallet balance',
            data:result
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            msg:error.messsage
        })
    }
}
exports.updateWallet=async(req,res)=>{
    let user=req.params.uid
    const{Amount}=req.body;
    let result=await Wallet.findOne({user});
    let chageamount=0
    chageamount+=result.Amount+parseInt(Amount);
    let result2=await Wallet.findOneAndUpdate({user},{Amount:chageamount},{new:true})
    try{
    if(result&&result2)
    {

      return  res.status(200).json({
        msg:"Wallet Updated",
        data:result
        })
    }
    return res.status(400).json({
        msg:"failed to update Wallet",
        })
    }
    catch(error)
    {
        res.status(500).json({
            msg:error.messsage
        })
    }

}
