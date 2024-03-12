// pages/api/signup.js

import bcrypt from 'bcrypt';
import clientPromise from "@/util/mongo";


// Function to validate email format
function isValidEmail(email) {
    // You can implement your own email validation logic here or use a library like validator.js
    // Example:
    // return validator.isEmail(email);
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  // Function to validate cellphone number format
  function isValidCellphone(cellphone) {
    // Validate cellphone format: 10 digits with a leading 0
    return /^[0][0-9]{9}$/.test(cellphone);
  }

  
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.NEXT_PUBLIC_SELECTED_DB);
        const collection = db.collection("categories");
      // Assuming req.body contains the signup form data
      const { firstName, lastName, email, location, cellphone, password, place } = req.body;

      // Validate email format
      if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      // Validate cellphone format
      if (!isValidCellphone(cellphone)) {
        return res.status(400).json({ error: 'Invalid cellphone number format' });
      }

      // Generate password hash
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = {
        firstName,
        lastName,
        email,
        location,
        place,
        cellphone,
        password,
        hash: hashedPassword,
      };
      const result = await collection.insertOne(user);
      return res.status(200).json({ message: 'Signup successful', id: result.insertedId});
    } catch (error) {
      console.error('Signup failed:', error.message);
      return res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
  } else {
    // Method not allowed
    return res.status(405).end();
  }
}

