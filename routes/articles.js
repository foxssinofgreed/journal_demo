var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    var articles = [{
        title: 'test article',
        createdAt: new Date(),
        description: 'test description'
    }];
    res.render('articles/articles', {   articles: articles  });
});

router.get('/new', (req, res) => {
    res.render('articles/new', {});
});

router.post('/', (req, res) => {

});

module.exports = router;