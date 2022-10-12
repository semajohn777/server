console.log("Hello");
require("dotenv").config()
const express = require("express");
const connectDb = require("./src/db/myData");
const app = express()
const Router = require("./src/router/commentRouter")
const cors = require("cors");
const userRouter = require("./src/router/userRoute");



app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(cors())
app.use(userRouter)
app.use(Router)


connectDb(process.env.JOHN__URL)
.then(()=>{
    console.log("db conneted");
})


app.listen(process.env.PORT, ()=>{
    console.log(`listening on ${process.env.PORT}`);
})