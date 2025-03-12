import Hospital from "../models/hospital.js";

const findNearbyHospitals = async (longitude, latitude) => {
  try {
    const hospitals = await Hospital.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [longitude, latitude] },
          $maxDistance: 50000 
        }
      }
    });
    return hospitals;
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return [];
  }
};

export default findNearbyHospitals;
