"use strict";

const mongoose = require('../mongoose');

const ContactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

ContactSchema.statics.findById = function (id) {
    return this.find({
        id: id
    });
}

module.exports = mongoose.model('contact', ContactSchema);
