const router = require('express').Router();

function isAuthorized(req, res, next) {
    if (req.user) {
        console.log("user is logged in.");
        console.log(req.user);
        next();
    } else {
        console.log('user is not logged in');
        res.redirect('/mods');
    }
};

router.get('/', (req, res) => {
    res.render('modsPage', {
        isAuthorized: req.user,
        user: req.user
    });
});

router.get('/settings', isAuthorized, (req, res) => {
    res.send(200)
});

module.exports = router;