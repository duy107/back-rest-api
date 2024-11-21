const mongoose = require("mongoose");
const cvSchema = new mongoose.Schema({
    statusRead: {
        type: Boolean, 
        default: false
    },
    accepted: {
        type: Boolean,
        default: false
    },
    description: String,
    project: String,
    job_id: String,
    user_id: String,
    company_id: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: String
}, {
    timestamps: true
});
const Cv = mongoose.model('Cv', cvSchema, "cvs");

module.exports = Cv;