const express=require("express")
const { createMessage, getMessage } = require("../Controllers/MessageController")
const messageRoute=express.Router()

messageRoute.post("/create-message",createMessage)
messageRoute.get("/get-message/:chatId",getMessage)

module.exports=messageRoute