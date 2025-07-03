const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/passmanagar");

const passwordSchema = mongoose.Schema({
    email : String,
    site: String,
    username : String,
    password: String
})

module.exports = mongoose.model("password", passwordSchema);