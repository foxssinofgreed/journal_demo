var express = require('express');
var router = express.Router();
var Article = require('../models/article')


router.get('/', (req, res) => {
    var articles = [{
        title: 'test article',
        createdAt: new Date(),
        description: 'test description'
    }];
    res.render('articles/articles', {   articles: articles  });
});

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() });
});

router.get('/:id', (req, res) => {

})

router.post('/', async (req, res) => {
    var article = new Article({
        title: req.body.title,
        description: req.body.description,
        mark_down: req.body.mark_down,
    });
    try {
        article = await article.save();
        res.redirect(`/article/${article.id}`);
    } catch (e) {
        res.render('article/new', { article: article });
    }
    
});

module.exports = router;