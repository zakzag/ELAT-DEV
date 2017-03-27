"use strict";

const mongoose = require('../mongoose');

const LogEntrySchema = new mongoose.Schema({
    contactName: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true
    },
    action: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('logentry', LogEntrySchema);
