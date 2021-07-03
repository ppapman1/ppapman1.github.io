const router = require('express').Router();
const ModArticle = require('../models/ModArticle');

router.get('/', async (req, res) => {
    const modArticles = await ModArticle.find({});
    
    res.render('modsMain', {
        isAuthorized: !(req.user === undefined),
        user: req.user,
        articles: modArticles
    });
});

router.get('/articles/:id', async (req, res) => {
    const article = await ModArticle.findById(req.params.id);
    if (article == null) {
        res.redirect('/mods');
    }
    res.send(`미완성! `);
});

module.exports = router;