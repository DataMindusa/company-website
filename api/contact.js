import { Pool } from "pg";
import { Resend } from "resend";

console.log("ENV CHECK:", {
  DATABASE_URL: !!process.env.DATABASE_URL,
  RESEND_API_KEY: !!process.env.RESEND_API_KEY,
  CONTACT_RECEIVER_EMAIL: process.env.CONTACT_RECEIVER_EMAIL,
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  try {
    await pool.query(
      `INSERT INTO contacts (name, email, message)
       VALUES ($1, $2, $3)`,
      [name, email, message]
    );

    const emailResponse = await resend.emails.send({
      from: "Contact Form <gabeke23@gmail.com>",
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: "New Contact Form Submission",
      html: `<p>${message}</p>`,
    });

    console.log("EMAIL SENT:", emailResponse);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("🔥 API ERROR:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
}






