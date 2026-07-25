const Product = require("../models/product.model");

// Obtener todos los productos
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

// Obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await Product.findById(pid);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado.",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener el producto.",
    });
  }
};

// Crear un producto
const createProduct = async (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;

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

// Actualizar un producto
const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const updatedData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(pid, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Producto no encontrado.",
      });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al actualizar el producto.",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(pid);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Producto no encontrado.",
      });
    }

    res.status(200).json({
      message: "Producto eliminado correctamente.",
      product: deletedProduct,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al eliminar el producto.",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
