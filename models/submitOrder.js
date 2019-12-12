const mongoose = require('mongoose');

const SubmitOrderSchema = new mongoose.Schema({
    customer_id:String,
    receipt_id:String,
    date:String,
    time:String,
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
})


module.exports = mongoose.model('SubmitOrder', SubmitOrderSchema)