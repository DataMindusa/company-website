import { Pool } from "pg";
import { Resend } from "resend";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 1️⃣ Save to database
    await pool.query(
      `INSERT INTO contacts (name, email, message)
       VALUES ($1, $2, $3)`,
      [name, email, message]
    );

    // 2️⃣ Send email notification
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Message received successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}


