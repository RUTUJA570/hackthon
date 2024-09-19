// const mongoose = require("mongoose")
// const Schema = mongoose.Schema;

// const orderSchema = new Schema({
//     ProductName: { type: String, required : true , index: true},
//     ProductImage : { type: String, required : true},
//     ProductDecr : { type: String, required : true}
// })

// module.exports = mongoose.model('orders' , orderSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    ProductName:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true, 
    },
    ProductImage:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('order', orderSchema);
