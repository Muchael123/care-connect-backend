import sendPushNotification from "../../lib/sendPushNotification.js";
import Nurse from "../../models/nurse.js";

export default async function updateNurseSchedule(req, res) {
    
    const { id,role } = req.user;

    if(role !== "nurse"){
        return res.status(403).json({message: "Forbidden"});
    }
    const { schedule } = req.body;
    console.log('update Nurse Schedule', schedule);
    try{
        const nurse = await Nurse.findOne({ user: id });
        if(!nurse){
            return res.status(404).json({message: "Nurse not found"});
        }
        if(Object.keys(schedule).length === 0){

            return res.status(400).json({message: "Schedule is required"});
        }
        for(let i=0; i<schedule.length; i++){
           //find a schedule that has the same day as the one in the request
            const day = schedule[i].day;
            const startTime = schedule[i].startTime;
            const endTime = schedule[i].endTime;
            const found = nurse.schedule.find((s) => s.day === day);
            if(found){
                found.startTime = startTime;
                found.endTime = endTime;
            } else{
                nurse.schedule.push({day, startTime, endTime});
            }
        }
        await nurse.save();
        res.status(200).json({message: "Schedule updated successfully", nurseshedule: nurse.schedule});
        if(nurse?.user?.fcm){
        return sendPushNotification (nurse?.user?.fcm, "Schedule Updated", "Your schedule has been updated");
        }
        return;
    } catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occured. Try again later"});
    }
}