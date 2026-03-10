import { getproducts ,addproduct, addProductform} from "../controllers/productController.js";
import express from "express";
const productRouter = express.Router();
productRouter.get("/", getproducts);
productRouter.get("/add", addProductform);
productRouter.post("/add", addproduct);


export { productRouter };


