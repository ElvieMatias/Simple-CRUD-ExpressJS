// Dependencies
const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../auth");

const {verify, verifyAdmin} = auth;

const router = express.Router();

// User Registration Route
/**
 * http://localhost:4000/users/userRegistration
 */
router.post("/userRegistration", userController.registration);

// 
/**
 * http://localhost:4000/users/login
 */
router.post("/login", userController.loginUser)

// Set User as admin
// Admin Access Only
/**
 * http://localhost:4000/users/updateUser
 * admin user: 
        "email": "elvie@mail.com",
        "password": "elvie0704"
 */
router.put("/updateUser", verify, verifyAdmin, userController.updateUserToAdmin);

//Retrieve authenticated user's  orders
/**
 * http://localhost:4000/users/myOrders
 */
router.get("/myOrders", verify, userController.getUserOrders);

//Retrieve all orders
// Admin Access Only
/**
 * http://localhost:4000/users/allOrders
 * admin user: 
        "email": "elvie@mail.com",
        "password": "elvie0704"
 */
router.get("/allOrders", verify, verifyAdmin, userController.getAllOrders);

// Export Route System
module.exports = router;

// Retrieve User Details
/**
 * http://localhost:4000/users/userDetails
 */
router.get("/:userId/userDetails", verify, userController.getUserDetails);
