import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createHash } from "node:crypto";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Constants
const ADMIN_USERNAME = "dhyan@gmail.com";
const ADMIN_PASSWORD_HASH = hashPassword("12345678");
const ADMIN_KEY = "INTERACT2026";

// Helper function to hash passwords
function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

// Initialize admin user on startup
async function initializeAdmin() {
  const adminUser = await kv.get("user:dhyan@gmail.com");
  if (!adminUser) {
    await kv.set("user:dhyan@gmail.com", {
      username: ADMIN_USERNAME,
      passwordHash: ADMIN_PASSWORD_HASH,
      isAdmin: true,
      createdAt: Date.now(),
    });
    console.log("Admin user initialized");
  }
}

initializeAdmin();

// Health check endpoint
app.get("/make-server-641c2aec/health", (c) => {
  return c.json({ status: "ok" });
});

// Debug endpoint to list all users (for testing)
app.get("/make-server-641c2aec/debug-users", async (c) => {
  try {
    const users = await kv.getByPrefix("user:");
    console.log("All users in database:", users);
    return c.json({
      success: true,
      count: users.length,
      users: users.map((u: any) => ({
        username: u.username,
        isAdmin: u.isAdmin,
        hasPassword: !!u.passwordHash
      }))
    });
  } catch (error) {
    console.log("Debug users error:", error);
    return c.json({ success: false, message: "Error fetching users" }, 500);
  }
});

// Login endpoint
app.post("/make-server-641c2aec/login", async (c) => {
  try {
    const { username, password } = await c.req.json();

    console.log("Login attempt for username:", username);

    if (!username || !password) {
      return c.json({ success: false, message: "Username and password required" }, 400);
    }

    const user = await kv.get(`user:${username}`);
    console.log("User from DB:", user);

    if (!user) {
      console.log("User not found in database");
      return c.json({ success: false, message: "Invalid credentials" }, 401);
    }

    const passwordHash = hashPassword(password);
    console.log("Password hash from input:", passwordHash);
    console.log("Password hash from DB:", user.passwordHash);

    if (user.passwordHash !== passwordHash) {
      console.log("Password mismatch");
      return c.json({ success: false, message: "Invalid credentials" }, 401);
    }

    console.log("Login successful for:", username);
    return c.json({
      success: true,
      user: {
        username: user.username,
        isAdmin: user.isAdmin || false,
      },
    });
  } catch (error) {
    console.log("Login error:", error);
    return c.json({ success: false, message: "Server error during login" }, 500);
  }
});

// Create user endpoint (admin only with key)
app.post("/make-server-641c2aec/create-user", async (c) => {
  try {
    const { username, password, adminKey } = await c.req.json();

    if (!username || !password || !adminKey) {
      return c.json({ success: false, message: "All fields required" }, 400);
    }

    if (adminKey !== ADMIN_KEY) {
      return c.json({ success: false, message: "Invalid admin key" }, 403);
    }

    const existingUser = await kv.get(`user:${username}`);

    if (existingUser) {
      return c.json({ success: false, message: "Username already exists" }, 409);
    }

    const passwordHash = hashPassword(password);

    await kv.set(`user:${username}`, {
      username,
      passwordHash,
      isAdmin: false,
      createdAt: Date.now(),
    });

    return c.json({
      success: true,
      message: "User created successfully",
      user: { username },
    });
  } catch (error) {
    console.log("Create user error:", error);
    return c.json({ success: false, message: "Server error during user creation" }, 500);
  }
});

// Get all users (admin only)
app.get("/make-server-641c2aec/users", async (c) => {
  try {
    const users = await kv.getByPrefix("user:");

    const userList = users.map((u: any) => ({
      username: u.username,
      isAdmin: u.isAdmin || false,
      createdAt: u.createdAt,
    }));

    return c.json({ success: true, users: userList });
  } catch (error) {
    console.log("Get users error:", error);
    return c.json({ success: false, message: "Server error while fetching users" }, 500);
  }
});

// Submit test endpoint
app.post("/make-server-641c2aec/submit-test", async (c) => {
  try {
    const { username, answers, score, timeTaken } = await c.req.json();

    if (!username || !answers || score === undefined || timeTaken === undefined) {
      return c.json({ success: false, message: "Missing required fields" }, 400);
    }

    const user = await kv.get(`user:${username}`);

    if (!user) {
      return c.json({ success: false, message: "User not found" }, 404);
    }

    const submission = {
      username,
      answers,
      score,
      timeTaken,
      submittedAt: Date.now(),
      status: "submitted",
    };

    await kv.set(`submission:${username}:${Date.now()}`, submission);

    return c.json({
      success: true,
      message: "Test submitted successfully",
      submission,
    });
  } catch (error) {
    console.log("Submit test error:", error);
    return c.json({ success: false, message: "Server error during test submission" }, 500);
  }
});

// Get all submissions (admin only)
app.get("/make-server-641c2aec/submissions", async (c) => {
  try {
    const submissions = await kv.getByPrefix("submission:");

    const sortedSubmissions = submissions.sort((a: any, b: any) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeTaken - b.timeTaken;
    });

    return c.json({ success: true, submissions: sortedSubmissions });
  } catch (error) {
    console.log("Get submissions error:", error);
    return c.json({ success: false, message: "Server error while fetching submissions" }, 500);
  }
});

// Get user test status
app.get("/make-server-641c2aec/test-status/:username", async (c) => {
  try {
    const username = c.req.param("username");
    const submissions = await kv.getByPrefix(`submission:${username}:`);

    if (submissions.length > 0) {
      return c.json({
        success: true,
        status: "completed",
        submission: submissions[0],
      });
    }

    return c.json({
      success: true,
      status: "not_started",
    });
  } catch (error) {
    console.log("Get test status error:", error);
    return c.json({ success: false, message: "Server error while fetching test status" }, 500);
  }
});

Deno.serve(app.fetch);
