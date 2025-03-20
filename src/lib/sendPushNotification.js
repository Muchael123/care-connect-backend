import {messaging} from '../config/firebase.js';

async function sendPushNotification(fcm, title, body){
    let sentmsgs = 0;
    const regex = /^ExponentPushToken\[[a-zA-Z0-9_-]+\]$/;
   for(let i = 0; i < fcm?.length; i++){
         if(regex.test(fcm[i])){
              //sent via expo
              const data = {
                to: fcm[i],
                title,
                body,
                sound: "default",
                priority: "high",
              }
              try{
                const res = await fetch("https://exp.host/--/api/v2/push/send", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                  });
                  if(res.ok){
                    sentmsgs++;
                  }
                  console.log("Expo Response:", res.ok);
                  const datas = await res.json();
                  console.log("Expo Data:", datas);
                  continue;
              } catch(err){
                    console.error("Expo Error:", err);
                    continue;
              }
         }
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