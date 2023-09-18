// Dependencies
const express = require("express");
const orderController = require("../controllers/orderController");
const auth = require("../auth");

const {verify, verifyAdmin} = auth;

const router = express.Router();

// Create Order / Checkout
// User Access : Non-admin 
/**
 * http://localhost:4000/orders/createOrder
 */
router.post("/createOrder",verify, orderController.checkout);


// Create Order / Checkout Multiple Products
// User Access : Non-admin 
/**
 * http://localhost:4000/orders/createMultipleOrders
 */
router.post("/checkOutMoreProducts",verify, orderController.checkoutMore);

// Export Route System
module.exports = router;