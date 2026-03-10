import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (adminId, res) => {
  const token = jwt.sign({adminId}, process.env.ADMIN_JWT_KEY, {
    expiresIn: "1d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("Admin_Key", token, {
    httpOnly: true,
    secure: isProduction,          // only require HTTPS in production
    sameSite: isProduction ? "none" : "lax",
  });
};

export default createTokenAndSaveCookie;