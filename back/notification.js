const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});


pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  });
// ✅ API: Get notifications
app.get("/api/notifications", async (req, res) => {
  try {
    // Fetch image, email, complaint_id from login table
    const loginResult = await pool.query(
      "SELECT image, email, complaint_id FROM login"
    );

    const data = [];
    for (const row of loginResult.rows) {
      // Get description from complaints table
      const compRes = await pool.query(
        "SELECT description FROM complaints WHERE complaint_id = $1",
        [row.complaint_id]
      );

      // ✅ If image is BYTEA (binary), convert to base64
      let imageData = null;
      if (row.image) {
        if (Buffer.isBuffer(row.image)) {
          imageData = row.image.toString("base64");
        } else {
          // assume it's already a URL
          imageData = row.image;
        }
      }

      data.push({
        profile: imageData, // will be base64 string or URL
        email: row.email,
        complaint_id: row.complaint_id,
        description: compRes.rows[0]?.description || null,
      });
    }

    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching notifications:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
