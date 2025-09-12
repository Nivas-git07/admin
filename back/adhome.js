const express=require('express');
const app=express();
const port=5000;
const path=require('path');
const { Pool }=require('pg');
const cors=require('cors');
require('dotenv').config();

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

app.use(cors());

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
  app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});