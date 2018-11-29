const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
    isbn: String,
    title: String,
    publishDate: Date,
    authors: [String],
    source: String
});

mongoose.model('Book', BookSchema);
module.exports = mongoose.model('Book');