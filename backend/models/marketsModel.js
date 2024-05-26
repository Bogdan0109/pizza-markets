const { Schema, model } = require("mongoose");


const marketSchema = Schema({
    shop: {
        type: String,
        required: [true, 'Set shop type'],
    },
    pizzas: {
        type: Array,
        required: [true, 'Set pizzas type'],
    },
}, { versionKey: false, timestamps: true });


const Market = model("market", marketSchema);


module.exports = {
    Market,
};

