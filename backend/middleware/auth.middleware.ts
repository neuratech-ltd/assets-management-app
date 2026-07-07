import { verifyToken } from "../utils/jwt";

const requireAuth = (req: any, res: any, next: any) => {
  const token = req.cookies?.token || req.headers?.authorization;
  if (!token) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token or expired" });
  }
};

export default requireAuth;
