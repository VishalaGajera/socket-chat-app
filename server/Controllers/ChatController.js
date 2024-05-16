const ChatService = require("../Services/ChatService");
const chatService=new ChatService();

exports.createChat = async (req, res) => {
    const { firstId, secondId } = req.body
    try {
        let chat = await chatService.getChat({ members: { $all: [firstId, secondId] } })
        if (chat) {
            return res.status(200).json({ chat: chat, message: "Chat is Alerady Added...👍🏻" })
        }
        if (!firstId && !secondId) {
            return res.status(400).json({ message: "" })
        }
        if (!firstId) {
            return res.status(400).json({ message: "" })
        }
        if (!secondId) {
            return res.status(400).json({ message: "" })
        }
        chat = await chatService.addNewChat({ members: [firstId, secondId] })
        return res.status(200).json({ chat: chat, message: "New Chat Is Added Successfully...👍🏻" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}` })
    }
}

exports.getUserChats = async (req, res) => {
    const userId = req.params.userId;
    try {
        const chats = await chatService.getAllChat({ members: { $in: [ userId ] } })
        return res.status(200).json(chats)
    } catch (error) {
        console.log(error);
        res.stuts(500).json({ message: `Internal Server Error...${console.error()}` })
    }
}

exports.getChat = async (req, res) => {
    const { firstId, secondId } = req.params;
    try {
        let chat = await chatService.getChat({ members: { $all: [firstId, secondId] } })
        return res.status(200).json(chat)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Internal Server Error...${console.error()}` })
    }
}