import bcrypt from "bcrypt";
import { signToken, verifyToken } from "../../utils/jwt";
import { prisma } from "../../lib/prisma";

export async function login(req: any, res: any) {
  const { email, password } = req.body;

  if (!password || password.trim() === "") {
    return res.status(400).json({ message: "Password is required" });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken({ id: user.id, email: user.email });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  const { password: _, ...safeUser } = user;
  res.json({ user: safeUser });
}

export function logout(req: any, res: any) {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
}

export async function me(req: any, res: any) {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      email: true,
      fullName: true,
      designation: true,
      employeeId: true,
    },
  });
  res.json({ user });
}
