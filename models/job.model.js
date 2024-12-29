const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const jobSchema = new mongoose.Schema({
    name: String,
    salary: String,
    status: {
        type: Boolean,
        default: true,
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: String,
    description: String,
    company_id: String,
    slug: {
        type: String,
        slug: "name",
        unique: true
    },
    experience: String,
    level: String,
    benefit: String
}, {
    timestamps: true
});
const Job = mongoose.model('Job', jobSchema, "jobs");

module.exports = Job;