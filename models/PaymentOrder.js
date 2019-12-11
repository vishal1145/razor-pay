const mongoose = require('mongoose');

const PaymentOrderSchema = new mongoose.Schema({
    google_id:String,
    facebook_id:String,
    custom_id: String,
    login_type:String,
    amount: Number,
    currency: String,
    notes: String,
    status: {
        type: String,
        default: 'InProgress'
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
})


module.exports = mongoose.model('PaymentOrder', PaymentOrderSchema)