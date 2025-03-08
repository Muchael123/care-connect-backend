
import ChatAi from "../lib/chatai.js";

export default async function chatBot(req, res){
    const {chat} = req.body;
    try{
        const result = await ChatAi([], chat);
        if(result.system_actions.includes("report_to_nurse")){
            // Send alert to nurse
        }
        else if(result.system_actions.includes("view_nearby_hospitals")){
            // Get nearby hospitals
        }
        else if(result.system_actions.includes("view_nearby_professionals")){
            // Get nearby professionals
        }
        else{
            
            res.status(200).json({message: result?.patient_response});
        }
       
    }
    catch (error){
        res.status(500).json({message: error});
    }
}