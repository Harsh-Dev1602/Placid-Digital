import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

// Middleware to check JWT
//only admin secure route
 export const adminSecureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.Admin_Key;
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token,process.env.ADMIN_JWT_KEY);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid Token" });
    }
    const user = await Admin.findById(decoded.adminId).select("-password"); // current loggedin user
    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in secureRoute: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
