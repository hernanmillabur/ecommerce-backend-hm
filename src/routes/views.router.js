const { Router } = require("express");

const {
  renderHome,
  renderProducts,
  renderProduct,
  renderCart,
  renderRealtime,
} = require("../controllers/views.controller");

const router = Router();

router.get("/", renderHome);

router.get("/products", renderProducts);

router.get("/products/:pid", renderProduct);

router.get("/carts/:cid", renderCart);

// Vista con Socket.IO
router.get("/realtime", renderRealtime);

module.exports = router;
