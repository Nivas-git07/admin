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

// ✅ Update complaint status
app.put("/:id/status", async (req, res) => {
  const { id } = req.params; // complaint_id
  const { status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE complaint 
       SET status = $1 
       WHERE complaint_id = $2 
       RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.json({ message: "Status updated", complaint: result.rows[0] });
  } catch (err) {
    console.error("❌ Error updating complaint:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
