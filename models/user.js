const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : String,
    nombre : String,
    apellido : String,
    firebaseId : String,
});

module.exports = mongoose.model('User', userSchema);
