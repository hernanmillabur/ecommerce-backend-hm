const Product = require("../models/product.model");
const productsSeed = require("../data/products.seed");

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    let { limit = 10, page = 1, sort, query } = req.query;

    limit = parseInt(limit);
    page = parseInt(page);

    const filter = {};

    if (query) {
      filter.category = query;
    }

    let mongooseQuery = Product.find(filter);

    if (sort === "asc") {
      mongooseQuery = mongooseQuery.sort({ price: 1 });
    }

    if (sort === "desc") {
      mongooseQuery = mongooseQuery.sort({ price: -1 });
    }

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await mongooseQuery.skip((page - 1) * limit).limit(limit);

    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    res.status(200).json({
      status: "success",
      payload: products,
      totalPages,
      prevPage: hasPrevPage ? page - 1 : null,
      nextPage: hasNextPage ? page + 1 : null,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage
        ? `/api/products?page=${page - 1}&limit=${limit}`
        : null,
      nextLink: hasNextPage
        ? `/api/products?page=${page + 1}&limit=${limit}`
        : null,
    });
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

    // Socket.IO
    const io = req.app.get("io");
    if (io) {
      const products = await Product.find();
      io.emit("productsUpdated", products);
    }

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

// Eliminar producto
const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(pid);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Producto no encontrado.",
      });
    }

    // Socket.IO
    const io = req.app.get("io");
    if (io) {
      const products = await Product.find();
      io.emit("productsUpdated", products);
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

// Cargar productos de ejemplo
const seedProducts = async (req, res) => {
  try {
    await Product.deleteMany({});

    await Product.insertMany(productsSeed);

    // Socket.IO
    const io = req.app.get("io");
    if (io) {
      const products = await Product.find();
      io.emit("productsUpdated", products);
    }

    res.status(200).json({
      status: "success",
      message: `${productsSeed.length} productos cargados correctamente.`,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Error al cargar los productos de ejemplo.",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts,
};
