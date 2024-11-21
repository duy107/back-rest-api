const mongoose = require("mongoose");
const tagJobSchema = new mongoose.Schema({
    tag_id: String,
    job_id: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: String
}, {
    timestamps: true
});
const TagJob = mongoose.model('TagJob', tagJobSchema, "tag-job");

module.exports = TagJob;