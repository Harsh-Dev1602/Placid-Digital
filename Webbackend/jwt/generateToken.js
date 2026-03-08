import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (adminId, res) => {
  const token = jwt.sign({ adminId }, process.env.ADMIN_JWT_KEY, {
    expiresIn: "1d",
  });
  res.cookie("Admin_Key", token, {
     httpOnly: false, // xss
    secure: false,
    sameSite: "Lax", // csrf
  });
};
export default createTokenAndSaveCookie;