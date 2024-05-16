const MessageService=require("../Services/MessageService")
const messageService=new MessageService();

exports.createMessage=async(req,res)=>{
    try {
        const message=await messageService.createMessage(req.body)
        res.status(200).json({msg:message, message:"New Message Is Added Successfully...👍🏻"})
    } catch (error) {
        console.log(error);
        res.stuats(500).json({message:`Internal Server Error...${console.error()}`})
    }
}

exports.getMessage=async(req,res)=>{
    const {chatId}=req.params;
    try {
        const message=await messageService.getMessage({chatId});
        res.status(200).json(message)
    } catch (error) {
        console.log(error);
        res.stuats(500).json({message:`Internal Server Error...${console.error()}`})
    }
}