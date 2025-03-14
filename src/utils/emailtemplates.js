const welcomeNurse = (email, name) => {
    const defaultMessage = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center; }
    .container { background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto; }
    .code { font-size: 32px; font-weight: bold; color: #007bff; margin: 20px 0; }
    .timer { font-size: 18px; font-weight: bold; color: #d9534f; margin: 10px 0; }
    .footer { margin-top: 20px; font-size: 14px; color: #555; }
    .disclaimer { font-size: 12px; color: #888; margin-top: 20px; text-align: left; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Welcome to Care-Connect! 🎉</h2>
    <p>Hello <b>${name}</b>,</p>
    <p>We're thrilled to have you on board! 🚀 Care-Connect is designed to make your experience seamless and rewarding.</p>
    <p>You have been added as a nurse in our system. You can now view and manage patient records, view nearby hospitals and professionals, and receive notifications for critical patient conditions.</p>
    <p>If you didn’t sign up, just ignore this email.</p>
    <div class="footer">
      <p>Regards,</p>
      <p><b>Care-Connect Team</b></p>
    </div>
    <div class="disclaimer">
        <p><b>Disclaimer:</b> This email is intended for the recipient only (${email}). If you received it in error, please delete it immediately. Do not share your verification code with anyone. Care-Connect will never ask for your password or personal details via email.</p>
        </div>
    </div>
</body>
</html>
`;
    return defaultMessage;
};
export { welcomeNurse };