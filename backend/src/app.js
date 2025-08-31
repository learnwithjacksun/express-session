import express from "express";
import session from "express-session";
import mongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import process from "process";
import authRouter from "./routes/auth.routes.js";

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        "http://localhost:3000", // frontend (dev)
        "https://express-session-delta.vercel.app", // frontend (prod)
        // Add your actual production frontend URL here
      ];
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    name: "my-session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // required for SameSite=None
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      // Remove domain configuration to let the browser handle it automatically
      // domain: process.env.NODE_ENV === "production" ? ".vercel.app" : "localhost",
    },
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API", success: true });
});

// Debug endpoint to check session
app.get("/debug-session", (req, res) => {
  res.json({
    sessionID: req.sessionID,
    session: req.session,
    cookies: req.headers.cookie,
    userAgent: req.headers["user-agent"],
    origin: req.headers.origin,
  });
});

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
