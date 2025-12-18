import { Pool } from "pg";
import { Resend } from "resend";

/**
 * ✅ Reuse pool across serverless invocations (VERY IMPORTANT on Vercel)
 */
const pool =
  global.pgPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

if (!global.pgPool) {
  global.pgPool = pool;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  const { name, email, message } = req.body || {};

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    /**
     * 1️⃣ Save message to database
     */
    const result = await pool.query(
      `
      INSERT INTO contacts (name, email, message)
      VALUES ($1, $2, $3)
      RETURNING id, created_at
      `,
      [name.trim(), email.trim(), message.trim()]
    );

    /**
     * 2️⃣ Send email notification (non-blocking failure)
     */
    try {
      await resend.emails.send({
        from: "Contact Form <onboarding@resend.dev>",
        to: process.env.CONTACT_RECEIVER_EMAIL,
        subject: "📩 New Contact Form Submission",
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr />
          <small>Submitted at ${new Date().toLocaleString()}</small>
        `,
      });
    } catch (emailError) {
      // Email failure should NOT break form submission
      console.error("Email send failed:", emailError);
    }

    /**
     * ✅ Success response
     */
    return res.status(200).json({
      success: true,
      message: "Message received successfully",
      data: {
        id: result.rows[0].id,
        created_at: result.rows[0].created_at,
      },
    });
  } catch (dbError) {
    console.error("Contact API error:", dbError);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}



