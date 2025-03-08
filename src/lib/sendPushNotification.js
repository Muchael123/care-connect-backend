import  admin from 'firebase-admin';


const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    unverse_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
}




const adconf = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

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
          const sent =  await adconf.messaging().send(message);
          console.log("FCM sent:", sent);
           sentmsgs++;
       } catch (error) {
           console.error("FCM Error:", error);
       }
   }
   return [sentmsgs, fcm.length];
}
export default sendPushNotification;