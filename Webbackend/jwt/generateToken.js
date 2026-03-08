import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (adminId, res) => {
  const token = jwt.sign({ adminId }, process.env.ADMIN_JWT_KEY, {
    expiresIn: "1d",
  });
  res.cookie("Admin_Key", token, {
    httpOnly: true,        // prevent XSS
    secure: true,          // required for HTTPS deployment
    sameSite: "Lax",      // allow cross-site cookies
  });
};
export default createTokenAndSaveCookie;