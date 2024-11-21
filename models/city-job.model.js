const mongoose = require("mongoose");
const cityJobSchema = new mongoose.Schema({
    city_id: String,
    job_id: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: String
}, {
    timestamps: true
});
const CityJob = mongoose.model('CityJob', cityJobSchema, "city-job");

module.exports = CityJob;