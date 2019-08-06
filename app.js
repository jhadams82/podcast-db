const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const podcastRoutes = require('./api/routes/podcasts')

// mongoose.connect(
//     "mongodb+srv://npcAdmin:" + 
//     encodeURIComponent(process.env.MONGO_ATLAS_PW) + 
//     "@nashville-podcast-db-9jz2j.mongodb.net/test?retryWrites=true&w=majority", 
//     { useNewUrlParser: true }
// );

mongoose.connect(
    "mongodb+srv://npcAdmin:Nash1Pod2Cast%23@nashville-podcast-db-9jz2j.mongodb.net/test?retryWrites=true&w=majority", 
    { useNewUrlParser: true }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/podcasts', podcastRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;