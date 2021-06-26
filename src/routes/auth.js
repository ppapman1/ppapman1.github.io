const router = require('express').Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord'))

router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/'
}));

router.get('/revoke', (req, res) => {
    req.session.destroy();
    res.redirect('/mods');
})

module.exports = router;