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
    origin: [
      "http://localhost:3000",
      "https://express-session-delta.vercel.app",
    ],
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
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    },
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API", success: true });
});

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
