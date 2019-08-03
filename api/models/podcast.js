const mongoose = require('mongoose');

const podcastSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    category: String,
    contact: {
        email: String,
        facebook: String,
        instagram: String,
        linkedIn: String,
        twitter: String,
        website: String
    },
    description: String,
    hosts: [
        { firstName: String, lastName: String },
        { firstName: String, lastName: String }
    ],
    image: String,
    status: String,
    subscription: {
        apple: String,
        breaker: String,
        google: String,
        overcast: String,
        radioPublic: String,
        rss: String,
        spotify: String,
        stitcher: String,
        tuneIn: String
    },
    title: String,
    username: String,
    yearStarted: String
});

module.exports = mongoose.model('Podcast', podcastSchema);