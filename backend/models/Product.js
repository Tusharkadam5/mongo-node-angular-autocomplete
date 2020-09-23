const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Product = new Schema({
   name: {type: String},
   quantity: {type: Number},
   cost_price:{type:Number},
   selling_price: {type: Number }
}, {
   collection: 'products'
})


module.exports = mongoose.model('Product', Product)
