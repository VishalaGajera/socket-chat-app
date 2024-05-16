const mongoose = require("mongoose")
require("dotenv").config()

const uri = process.env.DATABASE_URI

mongoose.connect(uri).then(() => console.log("MongoDB Connection Established..")).catch((error) => console.log("MongoDB Connection Faild : ", error.message))

// mongoose.connect("mongodb://127.0.0.1:27017/chat-app").then(()=>console.log("MongoDB Connection Established..")).catch((error)=>console.log("MonfoDB Connection Failed : " , error.message))