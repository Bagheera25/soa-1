const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
    isbn: String,
    title: String,
    publishDate: Date
});

mongoose.model('Book', BookSchema);
module.exports = mongoose.model('Book');