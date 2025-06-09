import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "G7k2pQz9Lm";

export const generateAuthToken = (userKey, email, res) => {
    const token = jwt.sign({ id: userKey, email }, JWT_SECRET, { expiresIn: '7d' });
    
    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: 'none',
        domain: process.env.COOKIE_DOMAIN || 'localhost', // Set your domain here
        secure: process.env.NODE_ENV === 'production', // Requires HTTPS in production
    });

    return token;
};