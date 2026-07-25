const Product = require("../models/product.model");
const { getPaginatedProducts } = require("../services/product.service");

// HOME
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

// TIENDA
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

// DETALLE PRODUCTO
const renderProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await Product.findById(pid).lean();

    console.log(product);

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

module.exports = {
  renderHome,
  renderProducts,
  renderProduct,
};
