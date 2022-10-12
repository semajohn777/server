const express = require("express")
const { signUp, loginUser } = require("../controller/user")
const userRouter = express.Router()

userRouter.post("/signup", signUp )
userRouter.post("/login", loginUser )

module.exports = userRouter