const mongoose = require("mongoose");
const citySchema = new mongoose.Schema({
    name: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: String
}, {
    timestamps: true
});
const City = mongoose.model('City', citySchema, "cities");

module.exports = City;