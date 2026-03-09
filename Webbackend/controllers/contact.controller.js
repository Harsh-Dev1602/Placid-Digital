import transporter from "../config/mailer.js";

// Make contact form fast by responding immediately and sending email in background
export const sendContactMail = async (req, res) => {
  const data = req.body;

  const userInfo = {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    Phnumber: data.Phnumber,
    message: data.message,
  };

  // Respond to client immediately so UI is fast and never times out
  res.json({
    success: true,
    message: "Thank you for contacting us. We have received your message.",
  });

  // Send email in the background (no need to block the response)
  try {
    await transporter.sendMail({
      from: userInfo.email,
      to: process.env.SEND_EMAIL_ID,
      subject: "New Contact Message from Placid Digital",
      html: `
        <div style="background-color:#f4f6fb;padding:24px 0;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(15,23,42,0.08);">
                  <tr>
                    <td style="background:#154979;padding:20px 24px;color:#ffffff;">
                      <h2 style="margin:0;font-size:22px;font-weight:700;letter-spacing:0.02em;">New Contact Message</h2>
                      <p style="margin:4px 0 0;font-size:13px;opacity:0.85;">A new enquiry has been submitted from the Placid Digital website.</p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:20px 24px 8px;">
                      <h3 style="margin:0 0 12px;font-size:16px;color:#0f172a;">Contact Details</h3>
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;color:#111827;">
                        <tr>
                          <td style="padding:6px 0;width:140px;font-weight:600;color:#6b7280;">First Name</td>
                          <td style="padding:6px 0;">${userInfo.firstname || "-"}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;width:140px;font-weight:600;color:#6b7280;">Last Name</td>
                          <td style="padding:6px 0;">${userInfo.lastname || "-"}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;width:140px;font-weight:600;color:#6b7280;">Email</td>
                          <td style="padding:6px 0;">
                            <a href="mailto:${userInfo.email}" style="color:#154979;text-decoration:none;">${userInfo.email}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;width:140px;font-weight:600;color:#6b7280;">Phone</td>
                          <td style="padding:6px 0;">${userInfo.Phnumber || "-"}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:8px 24px 20px;">
                      <h3 style="margin:0 0 8px;font-size:16px;color:#0f172a;">Message</h3>
                      <div style="padding:12px 14px;border-radius:8px;background:#f9fafb;border:1px solid #e5e7eb;font-size:14px;line-height:1.5;color:#111827;white-space:pre-wrap;">
                        ${userInfo.message || "(No message provided.)"}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:16px 24px 18px;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;text-align:center;">
                      <p style="margin:0 0 4px;">You’re receiving this email because someone submitted the contact form on the Placid Digital website.</p>
                      <p style="margin:0;">© ${new Date().getFullYear()} Placid Digital. All rights reserved.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending contact email:", error.message);
  }
};