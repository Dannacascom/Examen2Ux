const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title : String,
    content : String,
    authorId : String,
});

module.exports = mongoose.model('Post', postSchema);