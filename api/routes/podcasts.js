const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Podcast = require('../models/podcast');

router.get('/', (req, res, next) => {
    Podcast.find()
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length > 0) {
            res.status(200).json(docs);
            } else {
                res.status(404).json({
                    message: 'No Entries Found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const podcast = new Podcast({
        _id: new mongoose.Types.ObjectId(),
        category: req.body.category,
        contact: req.body.contact,
        description: req.body.description,
        hosts: req.body.hosts,
        image: req.body.image,
        status: req.body.status,
        subscription: req.body.subscription,
        title: req.body.title,
        username: req.body.username,
        yearStarted: req.body.yearStarted
    });
    podcast
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "New Podcast Created:",
                createdPodcast: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/:podcastId", (req, res, next) => {
    const id = req.params.podcastId;
    Podcast.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No valid entry for provided ID' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch('/:podcastId', (req, res, next) => {
    const id = req.params.podcastId;
    Podcast.update({ _id: id }, { $set: req.body })
        .exec()
        .then(result => {
            console.log(res);
            res.status(200).json({result});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:podcastId', (req, res, next) => {
    const id = req.params.podcastId;
    Podcast.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;