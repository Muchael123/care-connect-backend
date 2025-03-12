import Joi from 'joi';
const LocationSchema = Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
});
export default function ValidateLocation(req, res, next){
    console.log(req.body);
    const {error} = LocationSchema.validate(req.body);
    if(error){
        return res.status(400).json({message: error.message});
    }
    next();
}