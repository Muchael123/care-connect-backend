import Hospital from "../../models/hospital.js";

export default async function updateHospital(req, res){
    const {id} = req.user;
    const {name, level, coordinates} = req.body;
    const {hospitalid} = req.params;
    try{
        let update = {};
        if(name){
            update.name = name;
        }
        if(level){
            update.level = level;
        }
        if(coordinates){
            update.location = { type: "Point", coordinates };
        }
        const hospital = await Hospital.findOneAndUpdate
        ({_id: hospitalid, addedby: id}, update, {new: true});
        if(!hospital){
            return res.status(404).json({message: "Hospital not found"});
        }
        return res.status(200).json({message: "Hospital updated", hospital});

    } catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occured. Try again later"});
    }
}