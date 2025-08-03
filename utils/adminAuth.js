import admin from "./firebase.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "G7k2pQz9Lm";

export const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;
    // Check if the user is in the admins list
    const db = admin.database();
    const ref = db.ref("admins");
    const snapshot = await ref.orderByChild("email").equalTo(email).once("value");
    const admins = snapshot.val();
    if (!admins) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    // Optionally, attach admin info to req
    req.admin = { email };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
