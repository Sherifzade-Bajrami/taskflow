import { Router } from "express";

import prisma from "../lib/prisma";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// GET ALL USERS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
});

export default router;