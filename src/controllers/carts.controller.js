const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

// Crear un carrito
const createCart = async (req, res) => {
  try {
    const newCart = await Cart.create({
      products: [],
    });

    res.status(201).json(newCart);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al crear el carrito.",
    });
  }
};
const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    // Buscar carrito
    const cart = await Cart.findById(cid);

    if (!cart) {
      return res.status(404).json({
        message: "Carrito no encontrado.",
      });
    }

    // Buscar producto
    const product = await Product.findById(pid);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado.",
      });
    }

    // Buscar si ya existe en el carrito
    const productIndex = cart.products.findIndex((item) =>
      item.product.equals(pid),
    );

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({
        product: pid,
        quantity: 1,
      });
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al agregar el producto al carrito.",
    });
  }
};
const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await Cart.findById(cid).populate("products.product");

    if (!cart) {
      return res.status(404).json({
        message: "Carrito no encontrado.",
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener el carrito.",
    });
  }
};
const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    // Buscar el carrito
    const cart = await Cart.findById(cid);

    if (!cart) {
      return res.status(404).json({
        message: "Carrito no encontrado.",
      });
    }

    // Verificar que el producto exista dentro del carrito
    const productExists = cart.products.some((item) =>
      item.product.equals(pid),
    );

    if (!productExists) {
      return res.status(404).json({
        message: "El producto no existe en el carrito.",
      });
    }

    // Eliminar el producto
    cart.products = cart.products.filter((item) => !item.product.equals(pid));

    await cart.save();

    res.status(200).json({
      message: "Producto eliminado del carrito correctamente.",
      cart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al eliminar el producto del carrito.",
    });
  }
};

const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cid);

    if (!cart) {
      return res.status(404).json({
        message: "Carrito no encontrado.",
      });
    }

    const productIndex = cart.products.findIndex((item) =>
      item.product.equals(pid),
    );

    if (productIndex === -1) {
      return res.status(404).json({
        message: "Producto no encontrado en el carrito.",
      });
    }

    cart.products[productIndex].quantity = quantity;

    await cart.save();

    res.status(200).json({
      message: "Cantidad actualizada correctamente.",
      cart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al actualizar la cantidad del producto.",
    });
  }
};

module.exports = {
  createCart,
  addProductToCart,
  getCartById,
  deleteProductFromCart,
  updateProductQuantity,
};
