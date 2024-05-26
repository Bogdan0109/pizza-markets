const { Schema, model } = require("mongoose");


const orderSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        // default: "User",
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        // unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        // unique: true,
    },
    address: {
        type: String,
        required: [true, 'Phone is required'],
    },
    order: {
        type: Array,
        required: [true, 'Array is required'],
    },
    total: {
        type: Number,
        default: 0,
    },
}, { versionKey: false, timestamps: true });

const Order = model("order", orderSchema); //! DB_HOST

module.exports = {
    Order,
};

