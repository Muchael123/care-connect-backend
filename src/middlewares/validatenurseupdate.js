
import Joi from "joi";

const scheduleSchema = Joi.object({
    schedule: Joi.array().items(Joi.object({
        day: Joi.string().required(),
        startTime: Joi.string().required(),
        endTime: Joi.string().required()
    })).min(1).max(7).required()
});

export default function validateNurseUpdate(req, res, next) {
    const { error } = scheduleSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    if(req.user.role !== "nurse"){
        return res.status(403).json({message: "Forbidden"});
    }
    next();
}
