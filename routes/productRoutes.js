// Dependencies
const express = require("express");
const productController = require("../controllers/productController");
const auth = require("../auth");

const {verify, verifyAdmin} = auth;

const router = express.Router();

// Create/ADD New Product Route 
// Admin Access Only
/**
 * http://localhost:4000/products/createProduct
    admin user: 
        "email": "elvie@mail.com",
        "password": "elvie0704"
 */
router.post("/createProduct",verify, verifyAdmin, productController.addProduct);

// Retrieve all products
/*
    http://localhost:4000/products/allProducts
*/
router.get("/allProducts", productController.getAllProducts);

// Retrieve all products(Active)
/**
 * http://localhost:4000/products/allActiveProducts
*/
router.get("/allActiveProducts", productController.getAllActiveProducts);

// Retrieve single product
/**
 * Param : productId
 * http://localhost:4000/products/65016c9bff046f25a67d2712
 */
router.get("/:productId", productController.getProduct);

// Update Product Information
/** 
 * Param : productId
 * http://localhost:4000/products/65016c9bff046f25a67d2712
 * admin user: 
        "email": "elvie@mail.com",
        "password": "elvie0704"
*/
router.put("/:productId",verify, verifyAdmin, productController.editProductDetails);

// Archive Product
/**
 * Param : productId
 * http://localhost:4000/products/65016a522065e3f106c3e0d9/archive
 * admin user: 
        "email": "elvie@mail.com",
        "password": "elvie0704"
 */
router.put("/:productId/archive",verify, verifyAdmin, productController.archiveProduct);

// Activate Product
/**
 * Param : productId
 * http://localhost:4000/products/65016a522065e3f106c3e0d9/activate
 * admin user: 
        "email": "elvie@mail.com",
        "password": "elvie0704"
 */
router.put("/:productId/activate",verify, verifyAdmin, productController.activateProduct);


// Export Route System
module.exports = router;