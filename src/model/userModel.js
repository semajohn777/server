const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")


const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type: String,
        reqiured: true
    },

    email:{
        type: String,
        reqiured: true,
        unique: true
    },

    password:{
        type: String,
        reqiured: true
    }
},{timestamps:true})


userSchema.statics.signup =async function (username, email, password){

    if (!username || !email || !password) {
        throw Error("please fill all field")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong Enough")
    }
    const existUser = await this.findOne({email})

    if (existUser) {
        throw Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await this.create({username, email, password: hashPassword})

    return user
}


userSchema.statics.login = async function(email, password){
    if (!email || !password) {
        throw Error("please fill all field")
    }

    const user = await this.findOne({email})

    if (!user) {
        throw Error("Incorrect Email")
    }

    const comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword) {
        throw Error("Incorrect Password")
    }

    return user
}


const User = mongoose.model("user", userSchema)
module.exports = User