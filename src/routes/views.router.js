const { Router } = require("express");

const {
  renderHome,
  renderProducts,
  renderProduct,
} = require("../controllers/views.controller");

const router = Router();

router.get("/", renderHome);

router.get("/products", renderProducts);

router.get("/products/:pid", renderProduct);

module.exports = router;
