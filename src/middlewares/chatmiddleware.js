import Joi from "joi";


const chatSchema = Joi.object({
 message: Joi.string().required(),
 recieverid: Joi.string().required(),
})
export default function ValidateUserChat(req, res, next){
    const {error} = chatSchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log("error in chatschema");
        return res.status(400).json({ errors: error.details.map(err => err.message) });
      }
    console.log("no error in chatschema");
    next();
}