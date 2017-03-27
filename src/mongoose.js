const config = require('./config');
const mongoose = require('mongoose');

// change default promises to the native one
mongoose.Promise = global.Promise;

// connect to database
mongoose.connect(config.mongodb.uri).then(function onDBConnect(error) {
    if (error) {
        console.info("ERROR:", error);
    } else {
        console.info("Connection ok to ", config.mongodb.uri);
    }
});

module.exports = mongoose;