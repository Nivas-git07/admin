const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME ,
  port: process.env.DB_PORT ,
});


pool.connect()
.then(()=> console.log("✅ Connected to PostgreSQL"))
.catch((err) => {
  console.error("❌ Database connection error:", err.message);
  process.exit(1);
}
);


// ✅ Get all users
// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT user_id, name, email, role, status FROM adlogin"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});


// ✅ Add user

app.post("/api/users", async (req, res) => {
  const { name, email, password, role, status } = req.body;

  if (!name || !email || !password || !role || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO adlogin (name, email, password, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING user_id, name, email, role, status",
      [name, email, password, role, status]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Delete user
app.delete("/api/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    await pool.query("DELETE FROM adlogin WHERE user_id = $1", [userId]);
    res.json({ message: `User with id ${userId} deleted successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
