const mongoose =require("mongoose");

const orderSchema = new mongoose.Schema({


    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "userId is required"]
    },
    products:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
			required: [true, "productId is required"]
        },
        quantity:{
            type: Number,
            required: [true, "quantity is required"]
        }
    }],
    totalAmount:{
        type: Number,
        required: [true, "totalAmount is required"]
    },
    purchasedOn:{
        type: Date,
        default: new Date()
    }

})

module.exports = mongoose.model("Order", orderSchema);