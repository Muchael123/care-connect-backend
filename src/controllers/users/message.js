import { db } from "../../config/firebase.js";
import sendPushNotification from "../../lib/sendPushNotification.js";
import User from "../../models/user.js";

export default async function UserChat(req, res) {
  const { id } = req.user;
  const { message, recieverid } = req.body;
  
  console.log(req.body);
  if (!message || !recieverid) {
    return res.status(400).json({ message: "Please provide a message and recieverid" });
  }
  

  try {
    const chatRef = db.collection("chats");
    
    // findchat with the user id first
    const chatQuerySnapshot = await chatRef.where("participantsid", "array-contains", id).get();

    let chatDoc = null;
    chatQuerySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.participantsid.includes(id) && data.participantsid.includes(recieverid)) {
        chatDoc = { id: doc.id, ...data };
      }
    });

    console.log(chatDoc);

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
    console.log("Sener and recievers role",sender.role,reciever.role);
    // If chat does not exist, create
    if (!chatDoc) {
      const newChat = await chatRef.add({
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
      res.status(201).json({ message: "Message sent successfully", chatid: newChat.id });
      return sendPushNotification(reciever.fcm, "New message", message);
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
    res.status(200).json({ message: "Message sent successfully", chatid: chatId });
    return sendPushNotification(reciever.fcm, "New message", message);
    
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

