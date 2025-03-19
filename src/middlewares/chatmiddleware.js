import Joi from "joi";
import mongoose from "mongoose"


const chatSchema = Joi.object({
 message: Joi.string().required(),
 recieverid: Joi.string().required(),
})
export default function ValidateUserChat(req, res, next){
    const {error} = chatSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
      }
      if(!mongoose.Types.ObjectId.isValid(req.body.recieverid)){
       
        return res.status(400).json({ message: "Invalid recieverid" });
      }
    next();
}