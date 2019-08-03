const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling GET req to /podcasts'
    });
});

router.post('/', (req, res, next) => {
    const podcast = {
        id: req.body.id,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
    };
    res.status(200).json({
        message: 'handling POST req to /podcasts',
        podcast: podcast
    });
});

router.get('/:podcastId', (req, res, next) => {
    const id = req.params.podcastId;
    if (id === 'special') {
        res.status(200).json({
            message: 'you discovered the SPECIAL podcast',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'you passed and ID',
            id: id
        })
    }
});

router.patch('/:podcastId', (req, res, next) => {
    res.status(200).json({
        message: 'podcast updated'
    });
});

router.delete('/:podcastId', (req, res, next) => {
    res.status(200).json({
        message: 'podcast deleted, booiiii'
    });
});

module.exports = router;