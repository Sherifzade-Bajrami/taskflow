import { Router } from "express";

import prisma from "../lib/prisma";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();


// GET ALL PROJECTS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
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
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    res.json(projects);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
});

// CREATE PROJECT
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        description,
        ownerId: req.user!.userId,
        members: {
          create: {
            userId: req.user!.userId,
            role: "OWNER",
          },
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create project",
    });
  }
});

// GET SINGLE PROJECT
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const projectId = Number(req.params.id);

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
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        tasks: true,
      },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch project",
    });
  }
});

// UPDATE PROJECT
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const projectId = Number(req.params.id);
    const { name, description, status } = req.body;

    const existingProject = await prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: req.user?.userId,
      },
    });

    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found or access denied",
      });
    }

    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        name,
        description,
        status,
      },
    });

    res.json(updatedProject);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update project",
    });
  }
});

// DELETE PROJECT
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const projectId = Number(req.params.id);

    const existingProject = await prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: req.user?.userId,
      },
    });

    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found or access denied",
      });
    }

    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    res.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete project",
    });
  }
});

export default router;
