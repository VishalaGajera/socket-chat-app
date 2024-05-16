const express = require("express");
const chatRoute = express.Router();
const { createChat, getUserChats, getChat } = require("../Controllers/ChatController");

chatRoute.post("/create-chat", createChat);
chatRoute.get("/getUser-chat/:userId", getUserChats)
chatRoute.get("/get-chat/:firstId/:secondId", getChat)

module.exports = chatRoute
