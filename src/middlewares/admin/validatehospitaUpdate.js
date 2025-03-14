import Joi from "joi";
const hospitalSchema = Joi.object({
    name: Joi.string().optional(),
    level: Joi.number().min(1).max(7).optional(),
    coordinates: Joi.array().items(Joi.number()).length(2).optional()
});
export default function validateHospitaUpdate(req, res, next){
    const {error} = hospitalSchema.validate(req.body);
    if(error){
        return res.status(400).json({message: error.message});
    }
    next();
}