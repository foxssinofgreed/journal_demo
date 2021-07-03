var express = require('express');
var router = express.Router();
var Article = require('../models/article')


router.get('/', async (req, res) => {
    var articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/articles', {   articles: articles  });
});

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() });
});

router.get('/edit/:id', async (req, res) => {
    var article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article });
});

router.get('/:slug', async (req, res) => {
    var article = await Article.findOne({ slug: req.params.slug });
    if(article == null) res.redirect(`/article/`);
    res.render('articles/show', { article: article });
})

router.post('/', async (req, res) => {

});

router.put('/:id', async (req, res) => {

})

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/article');
});

function saveArticleAndRedirect(path) {
    return (req, res) => {
        var article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.mark_down = req.body.mark_down
        try {
            article = await article.save();
            res.redirect(`/article/${article.slug}`);
        } catch (e) {
            res.render(`article/${path}`, { article: article });
        }
    }
}

module.exports = router;