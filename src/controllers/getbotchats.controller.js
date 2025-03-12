import Chat from "../models/chat";

export default async function getBotChats(req, res){
    try{
        const user = req.user;
        //filter chats, id, last message, timestamp
        const chats = await Chat.find({userId: user.id});
        if(!chats){
            return res.status(404).json({message: "No chats found"});
        }

    } catch(err){
        console.error("Error getting chats", err);
        return res.status(500).json({message: "Internal server error"});
    }
}