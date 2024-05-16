const mongoose =require("mongoose");

const chatSchema = mongoose.Schema(
    {
        members: Array,
    },
    {
        timestamps: true,
    }
)

const ChatModel=mongoose.model("chats",chatSchema)
module.exports=ChatModel