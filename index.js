import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dbConnect from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import { storeRouter } from "./routes/storeRoute.js";
const app = express();
dotenv.config();
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "views");
app.set("layout","layout")
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use("/", storeRouter);
// app.use("/auth", authRouter);
app.use("/products", productRouter);
// app.use("/users", userRouter);

const startServer = async () => {
  try {
    await dbConnect();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
       console.log(`Server Started on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer()