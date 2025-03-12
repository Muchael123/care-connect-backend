import Chat from "../models/chat.js";
import ChatAi from "../lib/chatai.js";
import handleSystemActions from "../utils/systemActions.js";

export default async function chatBot(req, res) {
    try {
        const { chatid, message } = req.body;
        console.log("chatid = ", req.body);
        const user = req.user;

        if (!message) {
            return res.status(400).json({ message: "Message is required." });
        }

        let chat;
        if (!chatid) {
            chat = await Chat.create({
                userId: user.id,
                messages: [{ role: "user", parts: [{ text: message }] }],
                responses: [],
            });
        } else {
            chat = await Chat.findById(chatid);
            if (!chat) {
                return res.status(404).json({ message: "Chat not found." });
            }
            chat.messages.push({ role: "user", parts: [{ text: message }] });
        }

        const chatHistory = chat.messages.map(m => ({
            role: m.role,
            parts: m.parts.map(p => ({ text: p.text })),
        }));

        const result = await ChatAi(chatHistory, message);
        if (!result) {
            return res.status(500).json({ message: "AI response failed." });
        }

        if (result.patient_response) {
            chat.messages.push({ role: "model", parts: [{ text: result.patient_response }] });
            if(result.patient_condition){
                chat.patient_condition = result.patient_condition;
            }
            if(result.system_actions){
                handleSystemActions(result.system_actions);
            }
        }

        await chat.save();

        return res.status(200).json({
            message: result.patient_response,
            chatid: chat._id,
        });
    } catch (error) {
        console.error("Chatbot Error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}
