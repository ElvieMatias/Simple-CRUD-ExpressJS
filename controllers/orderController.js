// /[SECTION]Dependencies and modules

const User = require("../models/User");

const Product = require("../models/Product");

const Order = require("../models/Order");

const bcrypt = require("bcrypt");

const auth = require("../auth");

// Add New Product
// Only Admin User can create new product
module.exports.checkout = async (req, res) =>{

    console.log(req.user.id);

    // process stops here and sends response IF user is an admin
	if(req.user.isAdmin){
		return res.send("Action Forbidden")
	}

    try{

    let quantity = req.body.quantity;
    let product = await Product.findById(req.body.productId);

        let newOrder = new Order ({
            userId : req.user.id,
            totalAmount : product.price * quantity,
            products: [
                {
                    productId: req.body.productId,
                    quantity: quantity 
                }
            ]
        });

        await newOrder.save();
        return res.send(true);

    }catch (err) {
        console.error(err.message);
        return res.send(false);
    }
        
}

module.exports.checkoutMore = async (req, res) => {
    try{
        const productDetails = req.body;

        if (!Array.isArray(productDetails)) {
            return res.send({ error: 'Invalid productDetails format' });
          }

        const orderProduct = [];
        const productSubtotal = [];

        for (const detail of productDetails) {
            const product = await Product.findById(detail.productId);

            const subTotal = product.price * detail.quantity;
            console.log("subTotal: " +subTotal);

            if(!product){
                return res.send({ error: `Product with ID ${detail.productId} not found` });
            }

            orderProduct.push({
                productId: detail.productId,
                quantity: detail.quantity,
              });

              productSubtotal.push({
                totalAmount : subTotal
            })
        }

        const totalAmountSum = productSubtotal.reduce((accumulator, currentProduct) => {
            return accumulator + currentProduct.totalAmount;
          }, 0);
          console.log("total: " +totalAmountSum);
        const newOrder = new Order({
            userId: req.user.id,
            totalAmount: totalAmountSum,
            products: orderProduct
          });
      
          await newOrder.save();
          return res.send({ success: true, order: newOrder });
    }catch (err) {
        console.error(err.message);
        return res.send({ error: 'An error occurred while creating the order' });
      }
}