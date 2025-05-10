const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Product', productSchema);
