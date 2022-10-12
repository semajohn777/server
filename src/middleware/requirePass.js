const jwt = require("jsonwebtoken") 
const myModel = require('../model/userModel') 

const requirePass = async (req, res, next)=>{
   const {authorization} = req.headers

   if(!authorization) {
    return res.status(401).json({error: "Authorization token failed"})

   }

   const token = authorization.split(" ")[1]
   console.log(token);
   const {id} = req.params
   try {
       const  {_id}   = jwt.verify(token, process.env.MY__SECERT)
       console.log({_id});
       
       req.user = await myModel.findOne({_id}).select("_id")
    console.log(req.user);
   next()

   } catch (error) {
    console.log(error);
    res.status(401).json({error: "Requst is not authorized"})
   }
}

module.exports = requirePass