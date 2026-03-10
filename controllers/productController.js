import productModel from "../models/productModel.js";  

const getproducts =async (req,res) =>{
const products = await productModel.find();
res.render("products/index",{products});
};





export {getproducts};