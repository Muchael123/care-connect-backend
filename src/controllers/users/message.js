import { FieldValue } from "firebase-admin/firestore";
import { db } from "../../config/firebase.js";
import sendPushNotification from "../../lib/sendPushNotification.js";
import User from "../../models/user.js";

export default async function UserChat(req, res) {
  const { id } = req.user;
  const { message, recieverid } = req.body;

  if (!message || !recieverid) {
    return res.status(400).json({ message: "Please provide a message and recieverid" });
  }
  

  try {
    const chatroomid = [id, recieverid].sort().join("_");
    const chatRef = db.collection("chats").doc(chatroomid);
    const chatDoc =await chatRef.get();
    const [sender, reciever] = await Promise.all([
      User.findById(id).select("firstName lastName role fcm"),
      User.findById(recieverid),
    ]);

    if (!sender) {
      return res.status(404).json({ message: "Sender not found" }); 
    }
    if (!reciever) {
      return res.status(404).json({ message: "Reciever not found" });
    }
    
    // If chat does not exist, create
    if (!chatDoc) {
      const newChat = await chatRef.set({
        participantsid: [id, recieverid],
        participants: [{
          id,
          name: sender.role === "nurse" ? `Dr ${sender.firstName} ${sender.lastName}` : `${sender.firstName} ${sender.lastName}`
        }, {
          id: recieverid,
          name: reciever.role=== "nurse"? `Dr ${reciever.firstName} ${reciever.lastName}` : `${reciever.firstName} ${reciever.lastName}`
        }],
        messages: [
          {
            senderid: id,
            message,
            timestamp: Date.now(),
          }
        ],
        createdAt: Date.now(),
      });
      res.status(201).json({ message: "Message sent successfully", chatid: chatroomid });
      return sendPushNotification(reciever.fcm, "New message", message, { chatroomid });
    }
    

    await chatRef.update({ "messages":FieldValue.arrayUnion({ 
      senderid: id,
      message,
      timestamp: Date.now(),
    } )});
    res.status(200).json({ message: "Message sent successfully", chatid: chatroomid });
    return sendPushNotification(reciever.fcm, "New message", message, { chatroomid });
    
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

