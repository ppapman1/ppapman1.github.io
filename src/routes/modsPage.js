const router = require('express').Router();
const ModArticle = require('../models/ModArticle');

function isAuthorized(req, res, next) {
    // TODO 모드 제작자?고고:노노
    if (req.user) {
        console.log("user is logged in.");
        console.log(req.user);
        next();
    } else {
        console.log('user is not logged in');
        res.redirect('/auth');
    }
    next();
};

router.get('/', async (req, res) => {
    const modArticles = await ModArticle.find({});
    
    res.render('modsMain', {
        isAuthorized: !(req.user === undefined),
        user: req.user,
        articles: modArticles
    });

    // res.send(200);
});

// router.get('/articles/:id', (req, res) => {
//     res.render('modsManage');
// });

router.get('/manage', isAuthorized, (req, res) => {
    res.render('modsManage');
});

router.post('/manage/add', isAuthorized, async (req, res) => {
    // TODO 리다이렉트
    // TODO 이미 동일한 이름의 모드가 있다면: 리젝트
    if (!req.body.name) {
        return res.status(400);
    }
    res.redirect(303, '/mods');

    const newArticle = new ModArticle({
        name:           req.body.name,
        downloadLink:   req.body.download,
        repositoryLink: req.body.repository,
        authorName:     req.body.authorname,
        authorID:       req.user.id,
        version:        req.body.version,
        briefFeatures:  req.body.breiffeature,
        allFeatrues:    req.body.allfeature,
        dependencyMods: req.body.dependencymods,
        category:       req.body.category,
    });

    try {
        await newArticle.save();

    } catch (err) {
        console.log(err);
    }
});

module.exports = router;