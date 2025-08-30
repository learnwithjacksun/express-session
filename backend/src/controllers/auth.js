import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Registration Successful",
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Create session
    req.session.userId = user.id;
    console.log(req.session.userId);
    res
      .status(200)
      .json({ message: "Logged in successfully", success: true, data: user });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};

// Get current user
export const getMe = async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ message: "Not authenticated" });
  const user = await UserModel.findById(req.session.userId);
  res
    .status(200)
    .json({ message: "User fetched successfully", success: true, data: user });
};

// Logout
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully", success: true });
  });
};
