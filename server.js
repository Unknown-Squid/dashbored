const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pokemon_1234",
  database: "dashbored",
});

db.connect((err) => {
  if (err) console.log("Database connection failed:", err);
  else console.log("Connected to MySQL");
});

app.post("/create-user", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.json({ message: "username are required.", status: "error" });
  }

  const query = 'INSERT INTO user (username, age, gender, developer) VALUES (?, ?, ?, ?)';

  db.query(query, [username, null, null, null], (err, result) => {
    if (err) {
      return res.json({ message: 'Username already existing.', status: "error" });
    }

    console.log("user added:", result.insertId);
    res.json({ message: 'user added successfully!', status: "success", userId: result.insertId });
  });
});

app.post("/login-user", (req, res) => {
    const { username } = req.body;
  
    if (!username) {
      return res.status(400).json({ message: "Username is required.",  status: 'error' });
    }
  
    const query = 'SELECT * FROM user WHERE username = ?';
  
    db.query(query, [username], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Failed to query data.', status: 'error' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found.",  status: 'error' });
      }
  
      res.json({ data: result });
    });
});


app.put("/update-user-data", (req, res) => {
  const { username, age, gender, developer } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required.", status: "error" });
  }

  // Build dynamic update fields
  const fields = [];
  const values = [];

  if (age !== undefined) {
    fields.push("age = ?");
    values.push(age);
  }

  if (gender !== undefined) {
    fields.push("gender = ?");
    values.push(gender);
  }

  if (developer !== undefined) {
    fields.push("developer = ?");
    values.push(developer);
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: "No update fields provided.", status: "error" });
  }

  const updateQuery = `UPDATE user SET ${fields.join(", ")} WHERE username = ?`;
  values.push(username); // username as the WHERE clause value

  db.query(updateQuery, values, (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ message: 'Failed to update user info.', status: 'error' });
    }

    res.json({
      message: 'User info updated successfully.',
      status: 'success',
      data: { username, age, gender, developer }
    });
  });
});



app.get("/get-user-data", (req, res) => {
    const { username } = req.query;
  
    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }
  
    const query = 'SELECT * FROM user WHERE username = ?';
  
    db.query(query, [username], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Failed to query data.' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found." });
      }
  
      res.json({ data: result });
    });
});
  


// Start the server
// Server listens on all network interfaces
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
