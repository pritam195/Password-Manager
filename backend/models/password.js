const mongoose = require('mongoose');

const passwordSchema = mongoose.Schema({
    email : String,
    site: String,
    username : String,
    password: String
})

module.exports = mongoose.model("password", passwordSchema);