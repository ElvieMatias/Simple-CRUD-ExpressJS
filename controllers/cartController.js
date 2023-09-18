// /[SECTION]Dependencies and modules

const User = require("../models/User");

const Product = require("../models/Product");

const Order = require("../models/Order");

const Cart = require("../models/Cart");

const bcrypt = require("bcrypt");

const auth = require("../auth");

//Add to Cart
//
module.exports.addToCart = async (req, res) => {

    try {
        const { productId, quantity } = req.body;
    
        // Find the user's cart or create one if it doesn't exist
        let cart = await Cart.findOne({userId: req.user.id});
    
        if (!cart) {
          cart = new Cart({ userId: req.user.id, products: [] });
        }
    
        // Find the product and calculate subtotal
        const product = await Product.findById(productId);
        if (!product) {
          return res.send({ error: 'Product not found' });
        }
    
        const subTotal = product.price * quantity;
    
        // Check if the product is already in the cart
        const existingProductIndex = cart.products.findIndex(
          (item) => item.productId.toString() === productId
        );
    
        if (existingProductIndex !== -1) {
          // Update quantity and subtotal
          cart.products[existingProductIndex].quantity += quantity;
          cart.products[existingProductIndex].subTotal += subTotal;
        } else {
          // Add a new product to the cart
          cart.products.push({
            productId,
            quantity,
            subTotal,
          });
        }
    
        // Update the totalAmount
        cart.totalAmount = cart.products.reduce(
          (total, item) => total + item.subTotal,
          0
        );
    
        await cart.save();
        return res.send(cart);
      } catch (err) {
        console.error(err.message);
        return res.send({ error: 'An error occurred while adding to the cart' });
      }

}

module.exports.updateQuantity = async (req, res) => {

    try {
        const { productId, quantity } = req.body;
    
        const cart = await Cart.findOne({ userId : req.user.id });
    
        if (!cart) {
          return res.send({ error: 'Cart not found' });
        }
    
        const productIndex = cart.products.findIndex(
          (item) => item.productId.toString() === productId
        );
    
        if (productIndex === -1) {
          return res.send({ error: 'Product not found in the cart' });
        }
    
        // Update quantity and recalculate subtotal
        cart.products[productIndex].quantity = quantity;
        cart.products[productIndex].subTotal =
          cart.products[productIndex].quantity *
          (await Product.findById(productId)).price;
    
        // Update the totalAmount
        cart.totalAmount = cart.products.reduce(
          (total, item) => total + item.subTotal,
          0
        );
    
        await cart.save();
        return res.send(cart);
      } catch (err) {
        console.error(err.message);
        return res.send({ error: 'An error occurred while updating the cart' });
      }

}

// Delete/Remove a product from the cart
module.exports.removeFromCart = async(req, res) => {

    try {
        const { productId } = req.body;
    
        const cart = await Cart.findOne({ userId : req.user.id });
    
        if (!cart) {
          return res.status(404).json({ error: 'Cart not found' });
        }
    
        const productIndex = cart.products.findIndex(
          (item) => item.productId.toString() === productId
        );
    
        if (productIndex === -1) {
          return res.send({ error: 'Product not found in the cart' });
        }
    
        // Remove the product and update the totalAmount
        const removedProductSubtotal = cart.products.splice(productIndex,1)[0].subTotal;
        cart.totalAmount -= removedProductSubtotal;
    
        await cart.save();
        return res.send(cart);
      } catch (err) {
        console.error(err.message);
        return res.send({ error: 'An error occurred while removing from the cart' });
      }

}