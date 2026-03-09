import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import mongoose from "mongoose"; 
import dotenv from "dotenv"; 
import dbconnect from "./config/db.js";
// import {productRouter} from "./routes/productRoute.js";
import storeRoute from "./routes/storeroute.js";
const app = express();
dotenv.config();
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "views");
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
// app.use("/products", productRouter);
// app.use("/users", userRouter);
const startServer = async () => {
  await dbconnect();
}
app.listen(5000, () => {
  console.log("Server Started on http://localhost:5000");
});
startServer();