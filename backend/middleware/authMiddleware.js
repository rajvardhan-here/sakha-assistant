import adminAuth from "../config/firebaseAdmin.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    req.userId = decoded.uid;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default authMiddleware;