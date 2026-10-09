import { Router } from "express";

import prisma from "../lib/prisma";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// ADD PROJECT MEMBER
router.post(
  "/projects/:projectId/members",
  authMiddleware,
  async (req, res) => {
    try {
      const projectId = Number(req.params.projectId);
      const { userId, role } = req.body;

      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          ownerId: req.user?.userId,
        },
      });

      if (!project) {
        return res.status(404).json({
          message: "Project not found or access denied",
        });
      }

      const existingMember = await prisma.projectMember.findUnique({
        where: {
          userId_projectId: {
            userId,
            projectId,
          },
        },
      });

      if (existingMember) {
        return res.status(409).json({
          message: "User is already a project member",
        });
      }

      const member = await prisma.projectMember.create({
        data: {
          userId,
          projectId,
          role: role || "MEMBER",
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
      await prisma.notification.create({
        data: {
          title: "Added to project",
          message: `You were added to project: ${project.name}`,
          userId,
        },
      });

      res.status(201).json(member);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to add project member",
      });
    }
  },
);

// GET PROJECT MEMBERS
router.get("/projects/:projectId/members", authMiddleware, async (req, res) => {
  try {
    const projectId = Number(req.params.projectId);

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        OR: [
          {
            ownerId: req.user?.userId,
          },
          {
            members: {
              some: {
                userId: req.user?.userId,
              },
            },
          },
        ],
      },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found or access denied",
      });
    }

    const members = await prisma.projectMember.findMany({
      where: {
        projectId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(members);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch project members",
    });
  }
});

// UPDATE MEMBER ROLE
router.patch(
  "/projects/:projectId/members/:userId",
  authMiddleware,
  async (req, res) => {
    try {
      const projectId = Number(req.params.projectId);
      const userId = Number(req.params.userId);
      const { role } = req.body;

      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          ownerId: req.user?.userId,
        },
      });

      if (!project) {
        return res.status(404).json({
          message: "Project not found or access denied",
        });
      }

      const member = await prisma.projectMember.findUnique({
        where: {
          userId_projectId: {
            userId,
            projectId,
          },
        },
      });

      if (!member) {
        return res.status(404).json({
          message: "Project member not found",
        });
      }

      const updatedMember = await prisma.projectMember.update({
        where: {
          userId_projectId: {
            userId,
            projectId,
          },
        },
        data: {
          role,
        },
      });

      res.json(updatedMember);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to update project member",
      });
    }
  },
);

// DELETE PROJECT MEMBER
router.delete(
  "/projects/:projectId/members/:userId",
  authMiddleware,
  async (req, res) => {
    try {
      const projectId = Number(req.params.projectId);
      const userId = Number(req.params.userId);

      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          ownerId: req.user?.userId,
        },
      });

      if (!project) {
        return res.status(404).json({
          message: "Project not found or access denied",
        });
      }

      const member = await prisma.projectMember.findUnique({
        where: {
          userId_projectId: {
            userId,
            projectId,
          },
        },
      });

      if (!member) {
        return res.status(404).json({
          message: "Project member not found",
        });
      }

      if (member.role === "OWNER") {
        return res.status(400).json({
          message: "Project owner cannot be removed",
        });
      }

      await prisma.projectMember.delete({
        where: {
          userId_projectId: {
            userId,
            projectId,
          },
        },
      });

      res.json({
        message: "Project member removed successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to remove project member",
      });
    }
  },
);

export default router;
