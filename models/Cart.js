const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "userId is required"]
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, "productId is required"]
      },
      quantity: {
        type: Number,
        default: 0,
      },
      subTotal: {
        type: Number,
        default: 0,
      },
      addedCartOn:{
        type: Date,
        default: new Date()
      }
    }
  ],
  totalAmount: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model('Cart', cartSchema);