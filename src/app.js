require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const passport = require('passport');
const discordStrategy = require('./strategies/discordStrategy');
const db = require('./database/database');
const path = require('path');

// Route
const authRoute = require('./routes/auth');
const modsPageRoute = require('./routes/modsPage');
const managePageRoute = require('./routes/managePage');

// DB
db.then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));

app.use(session({
    secret: 'some random secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    name: 'discord.oauth2'
}));

// Set
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);
app.use('/mods', modsPageRoute);
app.use('/mods/manage', managePageRoute);

// Redirect from / to /mods (bcz i dont made "home" page yet)
app.get('/', (req, res) => {
    res.redirect('/mods');
})

app.listen(PORT, () => {
    console.log(`Now listening to requests on port ${PORT}`);
});