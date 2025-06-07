import jwt from 'jsonwebtoken';

// Middleware to protect routes using JWT
export function authenticateToken(req, res, next) {
    let token;
    try {
        token = req.cookies.token; // Retrieve token from cookies
    } catch (err) {
        console.log(err)
        return res.sendStatus(400);
    }
    if (!token) {
        console.log("No token provided");
        return res.sendStatus(401);
    };

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Token verification failed", err);
            return res.sendStatus(403)
        };
        req.user = user;
        next();
    });
}
