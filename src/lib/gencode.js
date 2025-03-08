import crypto from "crypto";

const generateVerificationCode = () => {
    return crypto.randomInt(100000, 999999);
  };
export default generateVerificationCode;