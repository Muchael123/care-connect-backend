import Joi from "joi";

const schema = Joi.object({
    password: Joi.string().min(6).required(),
    username: Joi.string().min(3).required(),
})

export default function ValidateLogDetails(req, res, next){
    const {error} = schema.validate(req.body, { abortEarly: false });
    console.log("error",error); 
    if (error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
      }
    next();
}