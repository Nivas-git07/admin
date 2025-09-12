const express=require('express');
const app=express();
const port=5000;
const path=require('path');
const { Pool }=require('pg');
const cors=require('cors');
require('dotenv').config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

const pool=new Pool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
})

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  });

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/complaints', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM complaints');
    const complaints = result.rows.map(row => ({
      ...row,
      image: row.image ? row.image.toString('base64') : null
    }));
    res.status(200).json(complaints);
    
  } catch (err) {
    console.error('Error fetching complaints:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM adlogin WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
    const user = result.rows[0];


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user.user_id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.json({ message: "✅ Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
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

// ✅ Update complaint status
app.put("/:id/status", async (req, res) => {
  const { id } = req.params; // complaint_id
  const { status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE complaints 
       SET status = $1 
       WHERE complaint_id = $2 
       RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Complaint not found" });
    }
     const complaint = result.rows[0];

    // 2. Update login table with notification when complaint is In Progress
    if (status === "In Progress") {
      const message = `Your complaint ${id} is now In Progress`;

      await pool.query(
        `UPDATE login 
         SET message = $1
         WHERE complaint_id = $2`,
        [message, id]
      );
    }

    res.json({ message: "Status updated", complaint: result.rows[0] });
  } catch (err) {
    console.error("❌ Error updating complaint:", err);
    res.status(500).json({ error: "Database error" });
  }
});

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


