import Hospital from "../../models/hospital.js";
import User from "../../models/user.js";

export default async function getNearbyHospitals(req, res) {
    try {
        // Fetch user location
        const user = await User.findById(req.user.id).select("location");
        if (!user || !user.location || !user.location.coordinates) {
            return res.status(404).json({ message: "User location not found" });
        }
        const [longitude, latitude] = user.location.coordinates;
        const hospitals = await Hospital.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [longitude, latitude] },
                    distanceField: "distance",
                    maxDistance: 50000, 
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
            { $limit: 5 }
        ]);

        if (!hospitals.length) {
            return res.status(404).json({ message: "No hospitals found nearby" });
        }

        return res.status(200).json(hospitals);
    } catch (err) {
        console.error("Error getting nearby hospitals:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
