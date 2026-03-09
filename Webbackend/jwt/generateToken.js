import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (adminId, res) => {
  const token = jwt.sign({ adminId }, process.env.ADMIN_JWT_KEY, {
    expiresIn: "1d",
  });
  res.cookie("Admin_Key", token, {
    httpOnly: true, // Temporarily set to false for testing
    secure: false,
    sameSite: "lax",
  });
};
export default createTokenAndSaveCookie;