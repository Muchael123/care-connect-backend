import sendPushNotification from "../lib/sendPushNotification.js";
import Hospital from "../models/hospital.js";
import Nurse from "../models/nurse.js";
import User from "../models/user.js";

export default async  function handleSystemActions(actions = [], userid, patients_data) {
  if (!Array.isArray(actions)) return;
  
  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    if (action === "report_to_nurse") {
      // finduserdetails
      const user = User.findById(userid);
      if (!user) {
        return;
      }
      //find nearby hospital
      const [longitude, latitude] = user.location.coordinates;
      const NearbyHospital = await Hospital.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [longitude, latitude] },
                distanceField: "distance",
                spherical: true
            }
        },
        {
            $project: {
                id: "$_id",
                _id: 0,
                name: 1,
                level: 1,
                distance: { $round: [{ $divide: ["$distance", 1000] }, 2] } 
            }
        },
        { $limit: 1 }
    ]);
    if (!NearbyHospital.length) {
        return;
    }      
      //find nurses in the hospital
      const hospital = await Hospital.findById(NearbyHospital[0].id);
      const nurses = await Nurse.find({ hospital: hospital.id }).populate('user').limit(5);
      if (!nurses.length) {
        return;
      }
      //send push notification to the nurse
      for (let j = 0; j < nurses.length; j++) {
        const nurse = nurses[j];
        sendPushNotification(nurse.user.fcm, {
          title: "Critical Patient Condition",
          body: `${user.firstName} ${user.lastName} needs your attention. They have these conditions: ${patients_data}`
        });
      }


    } else if (action === "view_nearby_hospitals") {
      console.log("System Action: Fetching nearby hospitals.");
      
    } else if (action === "view_nearby_professionals") {
      console.log("System Action: Fetching nearby professionals.");
    } else {
      console.warn(`Unknown system action: ${action}`);
    }
  }
}
