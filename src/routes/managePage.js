const router = require('express').Router();
const ModArticle = require('../models/ModArticle');

function isAuthorized(req, res, next) {
    // TODO 모드 제작자?고고:노노
    // TODO 나중에 console.log 지우기
    
    if (req.user) {
        console.log("user is logged in.");
        console.log(req.user);
        next();
    } else {
        console.log('user is not logged in');
        try {
            return res.redirect('/auth');
        } catch (e) {
            return res.status(400);
        }
    }
};

router.get('/', isAuthorized, async(req, res) => {
    const myMods = await ModArticle.find({ authorID: req.user.id });

    res.render('modsManage/manageMain', {
        user: req.user,
        mods: myMods
    });
});

router.post('/add', isAuthorized, async (req, res) => {
    // TODO 리다이렉트
    // TODO 이미 동일한 이름의 모드가 있다면: 리젝트
    if (!req.body.name) {
        return res.status(400);
    }

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
        res.redirect(302, '/mods/manage');

    } catch (err) {
        console.log(err);
    }
});

router.post('/delete', isAuthorized, async (req, res) => {
    if (!req.body.id) {
        return res.status(400);
    }

    try {
        await ModArticle.deleteOne({ _id: req.body.id })
        res.redirect(302, '/mods/manage');

    } catch (err) {
        console.log(err);
    }
});

module.exports = router;