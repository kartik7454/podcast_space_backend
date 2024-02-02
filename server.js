import express from "express"
import {} from 'dotenv/config'
import mongoose from "mongoose"
import {router} from "./routes/todoroutes.js"
import session from "express-session"
import connectMongoDBSession from "connect-mongodb-session";
const mongDBSession = connectMongoDBSession(session);


const app = express()


const store = new mongDBSession({
    uri:process.env.MONGO_URI,
    collection:"mySessions"
})
app.use(session( {
    secret:"cookie",
    resave:false,
    saveUninitialized:false,
    store:store
}))





app.use (express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
//routes
app.use('/',router)


//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{ //listen  for request
    app.listen(process.env.PORT,()=>{
     console.log("listening at port 4000! and connected to db")})
})
.catch((error)=>{
    console.log(error)
})



