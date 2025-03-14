import Hospital from "../../models/hospital.js";

export default async function addHospital(req, res){
    const {id} = req.user;
    const {name, level, coordinates} = req.body;
    try{
        const hospital = new Hospital({
            name,
            addedby: id,
            level,
            location: {
                coordinates
            }
        });
        await hospital.save();
        return res.status(201).json({message: "Hospital added successfully"});
    } catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occured. Try again later"});
    }
}