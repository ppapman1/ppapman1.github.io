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

// router.get('/articles/:id', (req, res) => {
//     res.render('modsManage');
// });

module.exports = router;