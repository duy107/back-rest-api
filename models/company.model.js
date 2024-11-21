const mongoose = require("mongoose");
const generate = require("../helpers/generate");
const companySchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    logo: String,
    address: String,
    description: String,
    workingTime: String,
    website: String,
    quantityPeople: Number,
    token: {
        type: String,
        default: () => generate.generateToken(20)
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: String
}, {
    timestamps: true
});
const Company = mongoose.model('Company', companySchema, "companies");

module.exports = Company;