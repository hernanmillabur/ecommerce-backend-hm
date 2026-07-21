const getProducts = (req, res) => {
  res.json({
    status: "success",
    message: "Listado de productos",
  });
};

module.exports = {
  getProducts,
};
