import Joi from 'joi';
const AppointmentSchema = Joi.object({
    nurseid: Joi.string().optional(),
    patientid: Joi.string().optional(),
    reason: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.string().required()
});

export default function validateAppointment(req, res, next){
    const {error} = AppointmentSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
      }
    next();

}