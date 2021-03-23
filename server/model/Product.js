const mongoose = require('mongoose');


const ProductSchema = mongoose.Schema(
  {
    skuId: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    sales: [{
      dealTime: Date
    }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    category: [String],
    images: [
      {
        path: String
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', ProductSchema);