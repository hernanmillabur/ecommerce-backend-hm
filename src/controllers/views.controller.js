const Product = require("../models/product.model");
const Cart = require("../models/cart.model");
const { getPaginatedProducts } = require("../services/product.service");

// ===============================
// HOME
// ===============================
const renderHome = async (req, res) => {
  try {
    const data = await getPaginatedProducts({
      limit: 4,
      page: 1,
    });

    res.render("home", {
      title: "HMTechStore",
      ...data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar la página principal.");
  }
};

// ===============================
// TIENDA
// ===============================
const renderProducts = async (req, res) => {
  try {
    const data = await getPaginatedProducts(req.query);

    res.render("products", {
      title: "Todos los Productos",
      ...data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar los productos.");
  }
};

// ===============================
// DETALLE PRODUCTO
// ===============================
const renderProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await Product.findById(pid).lean();

    if (!product) {
      return res.status(404).send("Producto no encontrado.");
    }

    res.render("product", {
      title: product.title,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar el producto.");
  }
};

// ===============================
// CARRITO
// ===============================
const renderCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await Cart.findById(cid).populate("products.product").lean();

    if (!cart) {
      return res.status(404).send("Carrito no encontrado.");
    }

    let total = 0;

    cart.products = cart.products.map((item) => {
      const subtotal = item.product.price * item.quantity;

      total += subtotal;

      return {
        ...item,
        subtotal,
      };
    });

    res.render("cart", {
      title: "Mi carrito",
      cart,
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar el carrito.");
  }
};

// ===============================
// REAL TIME PRODUCTS
// ===============================
const renderRealtime = async (req, res) => {
  try {
    res.render("realtime", {
      title: "Productos en Tiempo Real",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar la vista en tiempo real.");
  }
};

module.exports = {
  renderHome,
  renderProducts,
  renderProduct,
  renderCart,
  renderRealtime,
};
