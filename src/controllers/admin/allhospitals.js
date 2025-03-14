import Hospital from "../../models/hospital.js";

export default async function getAllHospitals(req, res){
    try{
        const hospitals = await Hospital.find();
        const allHospitals = hospitals.map(hospital => {
            return {
                name: hospital.name,
                id: hospital._id
            }
        });
        return res.status(200).json({allHospitals});
    } catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occured. Try again later"});
    }
}