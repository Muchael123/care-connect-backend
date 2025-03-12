import {messaging} from '../config/firebase.js';

async function sendPushNotification(fcm, title, body){
    let sentmsgs = 0;
   for(let i = 0; i < fcm.length; i++){
       const message = {
           notification: {
               title,
               body
           },
           token: fcm[i]

       }
       try {
          const sent =  await messaging.send(message);
          console.log("FCM sent:", sent);
           sentmsgs++;
       } catch (error) {
           console.error("FCM Error:", error);
       }
   }
   return [sentmsgs, fcm.length];
}
export default sendPushNotification;