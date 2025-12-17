export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  console.log("📩 New Contact Submission:", {
    name,
    email,
    message,
  });

  return res.status(200).json({
    success: true,
    message: "Message received successfully",
  });
}

