const express = require('express');
const app=express();
const port=3000;
const path=require('path');
const cors=require('cors');
const {Pool}=require('pg');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const pool=new Pool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
});
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
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
});


pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  });

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);  
})