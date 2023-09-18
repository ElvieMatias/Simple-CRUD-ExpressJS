// Dependencies
const express = require("express");
const cartController = require("../controllers/cartController");
const auth = require("../auth");

const {verify, verifyAdmin} = auth;

const router = express.Router();

//Add to Cart
// Add new products to cart 
/**
 * http://localhost:4000/carts/addToCart
 */
router.post("/addToCart", verify, cartController.addToCart);

//Change product quantities in the cart
/**
 * http://localhost:4000/carts/updateProductQty
 */
router.put("/updateProductQty", verify, cartController.updateQuantity);

//Remove product/s from cart
/**
 * http://localhost:4000/carts/removeFromCart
 */
router.delete("/removeFromCart", verify, cartController.removeFromCart);

// Export Route System
module.exports = router;