import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import admin from "../utils/firebase.js";
import { generateAuthToken } from "../utils/generateAuthToken.js";

const JWT_SECRET = process.env.JWT_SECRET || "G7k2pQz9Lm";

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = admin.database();
    const ref = db.ref("users");

    // Check if a user with the same email already exists in the database
    const snapshot = await ref
      .orderByChild("email")
      .equalTo(email)
      .once("value");
    if (snapshot.exists()) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password before storing it for security
    const hashedPassword = await bcrypt.hash(password, 8);

    // Push a new user entry to the Firebase Realtime Database
    const newUserRef = ref.push();
    await newUserRef.set({
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(), // Store the creation timestamp
    });

    // Generate a unique key for the user and issue an authentication token
    const userKey = newUserRef.key;
    generateAuthToken(userKey, email, res);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = admin.database();
    const ref = db.ref("users");

    // Query the database for a user with the provided email
    const snapshot = await ref
      .orderByChild("email")
      .equalTo(email)
      .once("value");
    const users = snapshot.val();
    if (!users) return res.status(401).json({ message: "Invalid credentials" });

    // Extract the first user (email is unique, so there should only be one match)
    const userKey = Object.keys(users)[0];
    const user = users[userKey];

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Issue an authentication token for the user
    generateAuthToken(userKey, user.email, res);

    res.json({ user: { id: userKey, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const checkAuth = (req, res) => {
  const token = req.cookies?.token;

  // Verify if the token exists in the request cookies
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    // Decode the token to extract user information
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: { id: decoded.id, email: decoded.email } });
  } catch (err) {
    res
      .status(401)
      .json({ authenticated: false, message: "Invalid or expired token" });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
  secure: process.env.NODE_ENV === 'production',
});
  res.status(200).json({ message: "Logged out successfully" });
};
