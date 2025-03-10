import Joi from "joi";

const schema = Joi.object({
    chatid: Joi.string().optional(),
    message: Joi.string().required()
});

export default function ValidateChat(req, res, next){
    const { error } = schema.validate(req.body, { abortEarly: false });
    if(error){
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    next();
} 