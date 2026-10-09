import { Router } from "express";

import prisma from "../lib/prisma";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();


// CREATE TASK
router.post("/projects/:projectId/tasks", authMiddleware, async (req, res) => {
  try {
    const projectId = Number(req.params.projectId);
    const { title, description, priority, dueDate, assigneeId } = req.body;

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

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        assigneeId,
        projectId,
      },
    });

    if (assigneeId) {
      await prisma.notification.create({
        data: {
          title: "New task assigned",
          message: `You were assigned to task: ${task.title}`,
          userId: assigneeId,
        },
      });
    }

    res.status(201).json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

// GET TASKS
router.get("/projects/:projectId/tasks", authMiddleware, async (req, res) => {
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

    const tasks = await prisma.task.findMany({
      where: {
        projectId,
      },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});

// GET SINGLE TASK
router.get("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const taskId = Number(req.params.id);

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        project: {
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
      },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found or access denied",
      });
    }

    res.json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch task",
    });
  }
});

// UPDATE TASK
router.patch("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const taskId = Number(req.params.id);
    const { title, description, status, priority, dueDate, assigneeId } =
      req.body;

    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        project: {
          ownerId: req.user?.userId,
        },
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found or access denied",
      });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        assigneeId,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
});

// DELETE TASK
router.delete("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const taskId = Number(req.params.id);

    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        project: {
          ownerId: req.user?.userId,
        },
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found or access denied",
      });
    }

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

export default router;