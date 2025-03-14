import Joi from "joi";

const hospitalSchema = Joi.object({
    name: Joi.string().required(),
    level: Joi.number().min(1).max(7).required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required()
});

export default function hospitalValidate(req, res, next){
    const {error} = hospitalSchema.validate(req.body);
    if(error){
        return res.status(400).json({message: error.message});
    }
    next();
}