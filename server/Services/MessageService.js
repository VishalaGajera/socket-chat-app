const Message=require("../Models/MessageModel")

module.exports=class MessageService{
    async createMessage(body){
        try {
            return await Message.create(body)
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
    async getMessage(body){
        try {
            return await Message.find(body)
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
    // async getAllMessage(){}
}