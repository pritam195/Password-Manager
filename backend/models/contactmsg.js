const mongoose = require('mongoose');

const contactmsgSchema = mongoose.Schema({
    name: String,
    email: String,
    message : String
})

module.exports = mongoose.model("contactmsg", contactmsgSchema);