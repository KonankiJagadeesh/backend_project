import productModel from "../models/productModel.js";  

const getproducts =async (req,res) =>{
const products = await productModel.find();
res.render("product/index",{products});
};

const addproduct =async (req,res) =>{
    const product =req.body;
    await productModel.create(product);
    res.redirect("/products");
}

const addProductform =async(req,res) =>{
    res.render("product/add");
}





export {getproducts, addproduct , addProductform};