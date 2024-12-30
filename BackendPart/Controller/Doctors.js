const Doctors=require('../Models/Doctors');
exports.PostDoctors=async (req,res)=>{
    try {
        const{Name,Education,Experience,Speciality,userId,consult_fee}=req.body;
        let result= await Doctors.create({Name,Education,Experience,Speciality,userId,consult_fee});
        res.status(201).json({
            msg:'Doctor Created',
            data:result
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:error.messsage
        })
    }
}
exports.fetchdoctors=async (req,res)=>{
    try {
        let result= await Doctors.find({})
        res.status(201).json({
            msg:'all doctors fetched',
            data:result
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            msg:error.messsage
        })
    }
}
exports.doctorInfo=async (req,res)=>{
    try {
        let Did=req.params.Did
        let result= await Doctors.findById({_id:Did})
        if(!result)
        {
          return res.status(400).json({
                msg:'Doctor not found',
            });
        }
        res.status(201).json({
            msg:'Doctor info',
            data:result
        });

    } catch (error) {
        res.status(500).json({
            msg:error.messsage
        })
    }
}