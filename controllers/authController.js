import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

// Render login page
const login = (req, res) => {
  res.render("auth/login");
};

// Handle login form submission
const validateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).render("auth/login", { error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).render("auth/login", { error: "Invalid credentials" });
    }

    // save minimal user data in session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.redirect("/");
  } catch (err) {
    console.error("Error during user validation:", err.message);
    res.status(500).render("error", { message: "An error occurred during login" });
  }
};

// Render registration page
const register = (req, res) => {
  res.render("auth/register");
};

// Handle registration form submission
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(400).render("auth/register", { error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({ name, email, password: hashedPassword });

    // log the user in automatically
    req.session.user = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    res.redirect("/");
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).render("error", { message: "An error occurred during registration" });
  }
};

// Log out and destroy session
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction error:", err);
    }
    res.redirect("/auth/login");
  });
};

export { login, validateUser, register, registerUser, logout };