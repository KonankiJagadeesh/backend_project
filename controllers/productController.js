import productModel from "../models/productModel.js";

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.render("products/index", { products });
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).render("error", { message: "Failed to load products" });
  }
};

const addProduct = async (req, res) => {
  try {
    const product = req.body;
    await productModel.create(product);
    res.redirect("/products");
  } catch (err) {
    console.error("Error adding product:", err.message);
    res.status(500).render("error", { message: "Failed to add product" });
  }
};

const addProductForm = async (req, res) => {
  res.render("products/add");
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await productModel.findByIdAndDelete(id);
    res.redirect("/products");
  } catch (err) {
    console.error("Error deleting product:", err.message);
    res.status(500).render("error", { message: "Failed to delete product" });
  }
};

const editProductForm = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findOne({ _id: id });
    res.render("products/edit", { product });
  } catch (err) {
    console.error("Error fetching product:", err.message);
    res.status(500).render("error", { message: "Failed to load product" });
  }
};

const saveProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await productModel.findByIdAndUpdate(id, req.body);
    res.redirect("/products");
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).render("error", { message: "Failed to update product" });
  }
};

export {
  getProducts,
  addProduct,
  addProductForm,
  deleteProduct,
  editProductForm,
  saveProduct
};

export {
  getProducts,
  addProduct,
  addProductForm,
  deleteProduct,
  editProductForm,
  saveProduct
};