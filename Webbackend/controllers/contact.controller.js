import transporter from "../config/mailer.js"

export const sendContactMail = async (req, res) => {

  const data = req.body;

  const userInfo = {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    Phnumber: data.Phnumber,
    message: data.message
  };

  try {

    await transporter.sendMail({
      from: userInfo.email,
      to: process.env.SEND_EMAIL_ID,
      subject: "New Contact Message",
      html: `
        <h3>New Contact Message</h3>
        <p>First Name: ${userInfo.firstname}</p>
        <p>Last Name: ${userInfo.lastname}</p>
        <p>Email: ${userInfo.email}</p>
        <p>Phone: ${userInfo.Phnumber}</p>
        <p>Message: ${userInfo.message}</p>
      `
    });

    res.json({
      success: true,
      message: "Email sent successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Email not sent",
      error: error.message
    });
  }
};