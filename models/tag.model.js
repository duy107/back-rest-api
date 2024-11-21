const mongoose = require("mongoose");
const tagSchema = new mongoose.Schema({
    name: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: String
}, {
    timestamps: true
});
const Tag = mongoose.model('Tag', tagSchema, "tags");

module.exports = Tag;