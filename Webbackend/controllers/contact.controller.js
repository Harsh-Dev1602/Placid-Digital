import transporter from "../config/mailer.js";

export const sendContactMail = async (req, res) => {
  const data = req.body;

  const userInfo = {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    Phnumber: data.Phnumber,
    message: data.message,
  };

  try {
    const fromEmail = process.env.EMAIL_USER || process.env.SEND_EMAIL_ID;
    const toEmail =
      process.env.CONTACT_RECEIVER_EMAIL || process.env.SEND_EMAIL_ID;

    if (!fromEmail) {
      return res.status(500).json({
        success: false,
        message:
          "Server email is not configured (missing EMAIL_USER/SEND_EMAIL_ID).",
      });
    }
    if (!toEmail) {
      return res.status(500).json({
        success: false,
        message:
          "Server email receiver is not configured (missing CONTACT_RECEIVER_EMAIL/SEND_EMAIL_ID).",
      });
    }

    await transporter.sendMail({
      from: `"Placid Digital" <${fromEmail}>`,
      replyTo: userInfo.email,
      to: toEmail,
      subject: "New Contact Message from Placid Digital",
      html: `
<div style="background-color:#f4f6fb;padding:40px 0;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 25px rgba(15,23,42,0.1);">
          
          <tr>
            <td style="background:#0F2B5B;padding:32px 32px;color:#ffffff;">
              <h2 style="margin:0;font-size:24px;font-weight:800;letter-spacing:-0.01em;">New Inquiry Received</h2>
              <p style="margin:8px 0 0;font-size:14px;opacity:0.85;font-weight:400;">A lead has just reached out via the Placid Digital contact form.</p>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 32px 10px;">
              <h3 style="margin:0 0 16px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#6b7280;font-weight:700;">Sender Information</h3>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:15px;color:#111827;border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;width:120px;font-weight:600;color:#4b5563;">Name</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">${userInfo.firstname} ${userInfo.lastname}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-weight:600;color:#4b5563;">Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
                    <a href="mailto:${userInfo.email}" style="color:#0F2B5B;text-decoration:none;font-weight:bold;">${userInfo.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-weight:600;color:#4b5563;">Phone</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">${userInfo.Phnumber || "Not provided"}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px 32px;">
              <h3 style="margin:0 0 12px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#6b7280;font-weight:700;">Message Content</h3>
              <div style="padding:20px;border-radius:12px;background:#f9fafb;border:1px solid #e5e7eb;font-size:15px;line-height:1.6;color:#111827;white-space:pre-wrap;">
                ${userInfo.message || "<em>No message provided.</em>"}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 40px;" align="center">
              <a href="mailto:${userInfo.email}" style="background:#0F2B5B;color:white;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:800;font-size:14px;display:inline-block;">Reply to Inquiry</a>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px;background:#f8fafc;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;text-align:center;">
              <p style="margin:0 0 6px;">This is an automated notification from the <strong>Placid Digital</strong> Web Server.</p>
              <p style="margin:0;">&copy; ${new Date().getFullYear()} Placid Digital. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>
      `,
    });

    return res.json({
      success: true,
      message: "Thank you for contacting us. We have received your message.",
    });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later.",
    });
  }
};