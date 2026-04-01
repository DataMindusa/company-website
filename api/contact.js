/* eslint-env node */

import { Pool } from "pg";
import { Resend } from "resend";

/* =========================================
   🔧 GLOBAL DB POOL (SAFE FOR VERCEL)
========================================= */
const pool =
  globalThis.pgPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
  });

if (!globalThis.pgPool) {
  globalThis.pgPool = pool;
}

/* =========================================
   📧 EMAIL SERVICE
========================================= */
const resend = new Resend(process.env.RESEND_API_KEY);

/* =========================================
   🛠 HELPER: SANITIZE INPUT
========================================= */
function sanitize(input) {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* =========================================
   🚀 HANDLER
========================================= */
export default async function handler(req, res) {
  try {
    /* =========================================
       ❌ METHOD CHECK
    ========================================= */
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { name, email, message } = req.body || {};

    /* =========================================
       ✅ VALIDATION
    ========================================= */
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const cleanName = sanitize(name.trim());
    const cleanEmail = email.trim().toLowerCase();
    const cleanMessage = sanitize(message.trim());

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        message: "Invalid email address",
      });
    }

    // Prevent spam / abuse
    if (cleanMessage.length > 2000) {
      return res.status(400).json({
        message: "Message is too long",
      });
    }

    /* =========================================
       🗄 SAVE TO DATABASE
    ========================================= */
    await pool.query(
      `
      INSERT INTO contacts (name, email, message)
      VALUES ($1, $2, $3)
      `,
      [cleanName, cleanEmail, cleanMessage]
    );

    /* =========================================
       📧 SEND EMAIL
    ========================================= */
    const emailResponse = await resend.emails.send({
      from: "DataMind Technologies <contact@datamindtechn.com>", // ✅ safe for now
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: "New Contact Form Submission",
      reply_to: cleanEmail,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>📩 New Contact Message</h2>

          <p><strong>Name:</strong> ${cleanName}</p>
          <p><strong>Email:</strong> ${cleanEmail}</p>

          <p><strong>Message:</strong></p>
          <div style="
            background:#f3f4f6;
            padding:12px;
            border-radius:8px;
            line-height:1.5;
          ">
            ${cleanMessage}
          </div>
        </div>
      `,
    });

    /* =========================================
       🔍 EMAIL DEBUG LOGGING
    ========================================= */
    console.log("📧 EMAIL RESPONSE:", emailResponse);

    /* =========================================
       ❌ EMAIL FAILURE CHECK
    ========================================= */
    if (!emailResponse || emailResponse.error) {
      console.error("❌ EMAIL ERROR:", emailResponse?.error);

      return res.status(500).json({
        message: "Email failed to send",
      });
    }

    /* =========================================
       ✅ SUCCESS
    ========================================= */
    return res.status(200).json({
      success: true,
      message: "Message received successfully",
    });

  } catch (error) {
    console.error("❌ Contact API Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}








