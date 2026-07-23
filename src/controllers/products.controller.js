const Product = require("../models/product.model");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener los productos",
    });
  }
};
const createProduct = async (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;

    // Validación básica
    if (!title || !description || !code || !price || !stock || !category) {
      return res.status(400).json({
        message: "Todos los campos obligatorios deben ser enviados.",
      });
    }

    const newProduct = await Product.create({
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al crear el producto.",
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
};
