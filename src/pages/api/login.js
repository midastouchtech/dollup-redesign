// pages/api/login.js

import bcrypt from 'bcrypt';
import clientPromise from "@/util/mongo";


// Function to validate email format
function isValidEmail(email) {
    // You can implement your own email validation logic here or use a library like validator.js
    // Example:
    // return validator.isEmail(email);
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
        const collection = db.collection("categories");
      // Assuming req.body contains the login form data
      const { email, password } = req.body;

      // Validate email format
      if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      const user =  await collection.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      // Compare the submitted password with the hashed password from the database
      const match = await bcrypt.compare(password, user.hash);

      if (!match) {
        return res.status(400).json({ error: 'Invalid password' });
      }
      res.send({ message: 'Login successful', user });
      
    } catch (error) {
      console.error('Signup failed:', error.message);
      return res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
  } else {
    // Method not allowed
    return res.status(405).end();
  }
}

