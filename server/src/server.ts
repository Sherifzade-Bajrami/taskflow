import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "./lib/prisma";
import { authMiddleware } from "./middleware/authMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== MIDDLEWARE ====================

app.use(cors());
app.use(express.json());

// ==================== AUTH ROUTES ====================

// REGISTER
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create user",
    });
  }
});

// LOGIN
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      },
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to login",
    });
  }
});

// CURRENT USER
app.get("/api/auth/me", authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user?.userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(user);
});

// ==================== USER ROUTES ====================

// GET ALL USERS
app.get("/api/users", authMiddleware, async (req, res) => {
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

// ==================== PROJECT ROUTES ====================

// GET ALL PROJECTS
app.get("/api/projects", authMiddleware, async (req, res) => {
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
app.post("/api/projects", authMiddleware, async (req, res) => {
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
app.get("/api/projects/:id", authMiddleware, async (req, res) => {
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
app.patch("/api/projects/:id", authMiddleware, async (req, res) => {
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
app.delete("/api/projects/:id", authMiddleware, async (req, res) => {
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

// ==================== TASK ROUTES ====================

// CREATE TASK
app.post("/api/projects/:projectId/tasks", authMiddleware, async (req, res) => {
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

    res.status(201).json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

// GET TASKS
app.get("/api/projects/:projectId/tasks", authMiddleware, async (req, res) => {
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
app.get("/api/tasks/:id", authMiddleware, async (req, res) => {
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
app.patch("/api/tasks/:id", authMiddleware, async (req, res) => {
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
app.delete("/api/tasks/:id", authMiddleware, async (req, res) => {
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

// ==================== PROJECT MEMBER ROUTES ====================

// ADD PROJECT MEMBER
app.post(
  "/api/projects/:projectId/members",
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
app.get(
  "/api/projects/:projectId/members",
  authMiddleware,
  async (req, res) => {
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
  },
);

// UPDATE MEMBER ROLE
app.patch(
  "/api/projects/:projectId/members/:userId",
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
app.delete(
  "/api/projects/:projectId/members/:userId",
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

// ==================== NOTIFICATION ROUTES ====================

// GET MY NOTIFICATIONS
app.get("/api/notifications", authMiddleware, async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.user!.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(notifications);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch notifications",
    });
  }
});

// MARK NOTIFICATION AS READ
app.patch("/api/notifications/:id/read", authMiddleware, async (req, res) => {
  try {
    const notificationId = Number(req.params.id);

    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId: req.user!.userId,
      },
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    const updatedNotification = await prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        unread: false,
      },
    });

    res.json(updatedNotification);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update notification",
    });
  }
});

// MARK ALL NOTIFICATIONS AS READ
app.patch("/api/notifications/read-all", authMiddleware, async (req, res) => {
  try {
    await prisma.notification.updateMany({
      where: {
        userId: req.user!.userId,
        unread: true,
      },
      data: {
        unread: false,
      },
    });

    res.json({
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update notifications",
    });
  }
});

// DELETE NOTIFICATION
app.delete("/api/notifications/:id", authMiddleware, async (req, res) => {
  try {
    const notificationId = Number(req.params.id);

    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId: req.user!.userId,
      },
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    await prisma.notification.delete({
      where: {
        id: notificationId,
      },
    });

    res.json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete notification",
    });
  }
});

// ==================== SERVER ====================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
