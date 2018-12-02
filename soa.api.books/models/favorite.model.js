const mongoose = require('mongoose');
const FavoriteSchema = new mongoose.Schema({
    isbn: String,
    userId: String
});

mongoose.model('Favorite', FavoriteSchema);
module.exports = mongoose.model('Favorite');