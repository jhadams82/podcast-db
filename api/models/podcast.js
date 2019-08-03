const mongoose = require('mongoose');

const podcastSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    category: String, 
    title: String, 
    description: String
});

module.exports = mongoose.model('Podcast', podcastSchema);