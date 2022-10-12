const User = require("../model/userModel")
const validator = require("validator")
const bycrpt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.MY__SECERT, {expiresIn : "2d"})
 }

const signUp = async(req, res)=>{
    const {username, email, password} = req.body

    // if (!username || !email || !password) {
    //   return  res.status(401).json({error: "Pls fill all field"})
    // }

    // if (!validator.isEmail(email)) {
    //    return res.status(201).json("Email is not valid")
    // }

    // if (!validator.isStrongPassword(password)) {
    //    return res.status(201).json("Password is not strong Enough")
    // }
    // const existUser = await User.findOne({email})
    // if (existUser) {
    //    return res.status(200).json("User Already Exist")
    // }

    // const salt = await bycrpt.genSalt();
    // const hashedpassword = await bycrpt.hash(password, salt)


    try {
        // const signNer = await User.create({
        //     username,
        //     email,
        //     password: hashedpassword
        // })
        const signUpuser = await User.signup(username, email, password)
        const token = createToken(signUpuser._id)
        res.status(200).json({username, token })
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

const loginUser = async(req, res)=>{
    const {email, password} = req.body

    // if(!email || !password) {
    //     res.status(201).json("Fill in all field")
    // }

    // if (!validator.isEmail(email)) {
    //     return res.status(201).json("Email is not valid")
    //  }
 
    //  if (!validator.isStrongPassword(password)) {
    //     return res.status(201).json("Password is not strong Enough")
    //  }
    //  const user = await User.findOne({email})
     
     try {
        //  if(user) {
        //      const loginUser = await bycrpt.compare(password, user.password)
        //      if (loginUser) {

        //         const token = createToken(user._id)
        //         return res.status(200).json({email, token})
        //      }
        // }
        // return res.status(201).json("User does not exist")
        const user = await User.login(email, password)

        const token = createToken(user._id)
        res.status(200).json({email, token})
     } catch (error) {
        res.status(401).json({error: error.message})
     }
}

module.exports = {signUp, loginUser}