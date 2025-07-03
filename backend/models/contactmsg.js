const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/passmanagar");

const contactmsgSchema = mongoose.Schema({
    name: String,
    email: String,
    message : String
})

module.exports = mongoose.model("contactmsg", contactmsgSchema);