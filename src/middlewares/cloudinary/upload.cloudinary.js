import Cloudinary from "../../config/cloudinary.js";

export default async function  UploadImage (req, res, next) {
    const file = req.files[0];
    if (!file) {
        next();
    }
    const ImageBuffer = file?.buffer?.toString("base64");
    const  result = await Cloudinary.uploader.upload(`data:${file?.mimetype};base64,${ImageBuffer}`,{
        folder: 'event-manager/events',
    });
    if (!result) {
        req.err = "Error uploading image";
        return next();
    }
    req.image = {
        url: result.secure_url,
        public_id: result.public_id,
    };
    next(); 

    }