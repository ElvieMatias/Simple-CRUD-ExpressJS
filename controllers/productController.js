// /[SECTION]Dependencies and modules

const User = require("../models/User");

const Product = require("../models/Product");

const bcrypt = require("bcrypt");

const auth = require("../auth");

// Add New Product
// Only Admin User can create new product
module.exports.addProduct = (req, res) =>{
    
    let newProduct = new Product({
        name: req.body.name,
        description : req.body.description,
        price: req.body.price
    });

    return newProduct.save().then((product,err) =>{
        if(err){
            return res.send(false);
        } else {
            return res.send({ success: true, product: product });
        }
    }).catch(err => err)
}

// Retrieve All Products
module.exports.getAllProducts = (req, res) =>{

    return Product.find({}).then(product =>{
        return res.send(product);
    })
}

// Retrieve All Products - ACTIVE
module.exports.getAllActiveProducts = (req, res) =>{

    return Product.find({isActive: true}).then(product =>{
        return res.send(product);
    })
}

// Retrieve Single Product 
module.exports.getProduct = (req, res) =>{

    return Product.findById(req.params.productId).then(product =>{
        return res.send(product);
    })
}

// Update Product Details
// Only Admin User can update Product Details
module.exports.editProductDetails = (req, res) =>{
    let updatedProducts = {
        name: req.body.name,
        description : req.body.description,
        price: req.body.price
    }

    return Product.findByIdAndUpdate(req.params.productId, updatedProducts).then((product, err) =>{
        if(err){
            return res.send(false);
        } else {
            return res.send(true);
        }
    })
}

// Archive Product
// Only Admin User can update/archive Product
module.exports.archiveProduct = (req, res) =>{
    let archiveProduct ={
        isActive: false
    }

    return Product.findByIdAndUpdate(req.params.productId, archiveProduct).then((product, err) =>{
        if(err){
            return res.send(false);
        }else{
            return res.send(true)
        }
    })
}

// Activate Product
// Only Admin User can update/activate Product
module.exports.activateProduct = (req, res) =>{
    let activateProduct ={
        isActive: true
    }

    return Product.findByIdAndUpdate(req.params.productId, activateProduct).then((product, err) =>{
        if(err){
            return res.send(false);
        }else{
            return res.send(true)
        }
    })
}