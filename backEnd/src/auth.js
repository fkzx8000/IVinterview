import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "./database.js";

dotenv.config();

function hashPassword(password) {
  return crypto.createHash("sha512").update(password).digest("hex");
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["auth"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access token required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });

    req.user = user;
    next();
  });
}

async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const findUserQuery = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.execute(findUserQuery, [email]);

    if (rows.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = rows[0];
    const hashedInputPassword = hashPassword(password);

    if (hashedInputPassword !== user.password)
      return res.status(401).json({ message: "Invalid credentials" });

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      nickname: user.Nickname,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token: token,
      user: {
        id: user.id,
        nickname: user.Nickname,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
}

async function getUserInfo(req, res) {
  try {
    const userId = req.user.userId;

    const findUserQuery = "SELECT * FROM users WHERE id = ?";
    const [rows] = await db.execute(findUserQuery, [userId]);

    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });
    const user = rows[0];
    res.json({
      id: user.id,
      nickname: user.Nickname,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
}

export { hashPassword, authenticateToken, loginHandler, getUserInfo };
