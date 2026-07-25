const { Router } = require("express");

const {
  createCart,
  addProductToCart,
  getCartById,
  deleteProductFromCart,
  updateProductQuantity,
  updateCart,
  clearCart,
} = require("../controllers/carts.controller");

const router = Router();

router.post("/", createCart);
router.get("/:cid", getCartById);
router.post("/:cid/products/:pid", addProductToCart);
router.delete("/:cid/products/:pid", deleteProductFromCart);
router.put("/:cid/products/:pid", updateProductQuantity);
router.put("/:cid", updateCart);
router.delete("/:cid", clearCart);
module.exports = router;
