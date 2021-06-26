const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const DiscordUser = require('../models/DiscordUser')

passport.serializeUser((user, done) => {
    done(null, user.discordId);
});

passport.deserializeUser(async(id, done) => {
    const user = await DiscordUser.findOne({ discordId: id });
    if (user) {
        done(null, user)
    };
});

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ['identify', 'guilds']
}, async(accessToken, refreshToken, profile, done) => {
    try {
        const user = await DiscordUser.findOne({ discordId: profile.id })

        if (user) {
            done(null, user);
        } else {
            const newUser = await DiscordUser.create({
                discordId: profile.id,
                username: profile.username
            });
            const saveUser = await newUser.save();
            done(null, saveUser);
        }
    } catch (err) {
        console.log(err);
        done(err, null);
    }

    // const guilds = profile.guilds;

    // for (var i = 0; i < guilds.length; i++) {
    //     if (guilds[i].id === '783482345373040650') {
    //         console.log('얼불춤 모딩 디스코드에 참여해 있어요.')
    //     }
    // }
}));