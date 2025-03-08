import Chat from "../models/chat.js"
import ChatAi from "../lib/chatai.js";

export default async function chatBot(req, res){
    const {chatid, message} = req.body;

    const user = req.user;
    let history = [];
    let chat;
    if(!chatid ){
       //create new chat
       chat = await Chat.create({userId: user.id, messages: [{role: "user", parts: [{text: message}]}]});
    }else{
        // get chat
        chat = await Chat.findById(chatid);
        history = chat.messages;
        chat.messages.push({role: "user", parts: [{text: message}]});
        chat.save();
    }

    try{
        const result = await ChatAi(history, message);
        if(result){
            res.status(200).json({message: result?.patient_response, chatid: chat._id});
        }
        if(result.system_actions.includes("report_to_nurse")){
            // Send alert to nurse
        }
        else if(result.system_actions.includes("view_nearby_hospitals")){
            // Get nearby hospitals
        }
        else if(result.system_actions.includes("view_nearby_professionals")){
            // Get nearby professionals
        }
       
    }
    catch (error){
        res.status(500).json({message: error});
    }
}
