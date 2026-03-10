import { getproducts } from "../controllers/productController.js";
import express from "express";
const productRouter = express.Router();
productRouter.get("/", getproducts);


export { productRouter };


