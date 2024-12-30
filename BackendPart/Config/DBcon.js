const mongoose = require('mongoose');
require('dotenv').config();

const DBConnect=()=>{
     mongoose.connect(process.env.dburl).then(()=>{
         console.log("Connection Successfull!");
     }).catch(
         (error)=>{
             console.log("could not connect",error);
         }
     );
 }
  module.exports=DBConnect;