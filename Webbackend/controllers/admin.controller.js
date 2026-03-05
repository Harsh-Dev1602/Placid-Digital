import Admin from '../models/admin.model.js';
import bcrypt from 'bcrypt';
import createTokenAndSaveCookie from "../jwt/generateToken.js"

// Seed Admin 
 const seedAdmin = async () => {   
   try {
     const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL }); 
     if (existingAdmin) {
       console.log('✅ @dmin already exists..');
       return;
      }
    const hashPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);

    const newAdmin = new Admin({
      fullname: 'HARSH DEV',
      email: process.env.ADMIN_EMAIL,
      password: hashPassword,
      role: '@dmin',
      verified: true
    });

    await newAdmin.save();
    console.log('🧑‍💼 Default @dmin created');
  } catch (error) {
    console.error('❌ Error:  default @dmin not created:', error.message);
  }
};

export default seedAdmin



// Log In API

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!admin) {
      return res.status(400).json({ error: "Invalid admin email id" });
    }
    else if(!isMatch){
      return res.status(400).json({ error: "Invalid admin password" });
    }
     createTokenAndSaveCookie(admin.id, res);
    res.status(201).json({
      message: "Admin logged in successfully",
      admin: {
        id: admin.id,
        fullname: admin.fullname,
        email: admin.email,
        role:admin.role
      },

    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Admin not registered" });
  }
};

// Logout API
export const logout = async (req, res) => {
  try {
     res.clearCookie("Admin_Key");
    res.status(201).json({ message: "Admin log out successfully.." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Admin not log out.. " });
  }
};