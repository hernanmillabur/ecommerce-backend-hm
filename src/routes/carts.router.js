const { Router } = require("express");

const {
  createCart,
  addProductToCart,
  getCartById,
  deleteProductFromCart,
} = require("../controllers/carts.controller");

const router = Router();

router.post("/", createCart);
router.get("/:cid", getCartById);
router.post("/:cid/products/:pid", addProductToCart);
router.delete("/:cid/products/:pid", deleteProductFromCart);

module.exports = router;
