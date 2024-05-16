const Chat = require("../Models/ChatModel")

module.exports = class ChatService {
    async addNewChat(body) {
        try {
            return await Chat.create(body)
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }

    async getChat(body) {
        try {
            return await Chat.findOne(body)
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
    
    async getAllChat(body) {
        try {
            return await Chat.find(body)
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
    // async deleteChat(){}
}