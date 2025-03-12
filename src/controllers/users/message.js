import { db } from "../../config/firebase.js";
import User from "../../models/user.js";

export default async function UserChat(req, res) {
  const { id } = req.user;
  const { message, recieverid } = req.body;
  
  if (!message || !recieverid) {
    return res.status(400).json({ message: "Please provide a message and recieverid" });
  }
  
  try {
    const chatRef = db.collection("chats");
    
    // Use array-contains-any to find chats that include at least one of the IDs
    const chatQuerySnapshot = await chatRef
      .where("participants", "array-contains-any", [id, recieverid])
      .get();
      
   
    let chatDoc = null;
    chatQuerySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.participants.includes(id) && data.participants.includes(recieverid)) {
        chatDoc = { id: doc.id, ...data };
      }
    });
    
    if (!chatDoc) {
     
      const newChat = await chatRef.add({
        participants: [id, recieverid],
        messages: [
          {
            senderid: id,
            message,
            timestamp: Date.now(),
          }
        ],
        createdAt: Date.now(),
      });
      
      res.status(201).json({ message: "Message sent successfully", chatId: newChat.id });
      return sendPushNotification(recieverid, message);
    }
    
    // Chat exists; add new message to the existing messages array.
    const chatId = chatDoc.id;
    const updatedMessages = [
      ...chatDoc.messages,
      {
        senderid: id,
        message,
        timestamp: Date.now(),
      }
    ];
    await chatRef.doc(chatId).update({ messages: updatedMessages });
    res.status(201).json({ message: "Message sent successfully", chatId });
    return sendPushNotification(recieverid, message);
    
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function sendPushNotification(recieverid, message) {
  const userFcm = await User.findById(recieverid, "fcm");
  if (!userFcm) {
    return;
  }

  return sendPushNotification(fcm, "New Message", message);
}
