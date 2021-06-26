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
        const user = await DiscordUser.findOne({ discordId: profile.id });

        // TODO NEED CHANGE THIS
        let isInModsGuild = false;
        let isDeveloper = true;

        for (let i = 0; i < profile.guilds.length; i++) {
            if (profile.guilds[i].id == 783482345373040650) {
                isInModsGuild = true;
            }
        }
        // let isDeveloper

        if (user) {
            await DiscordUser.findOneAndUpdate(
                { discordId: profile.id }, { isInModsGuild: isInModsGuild, isDeveloper: isDeveloper }, (err, result) => {
                    if (!err) {
                        console.log(result);
                        done(null, user);
                    } else {
                        done(err, null);
                    }}
            );
            
        } else {
            const newUser = await DiscordUser.create({
                discordId: profile.id,
                username: profile.username,
                isInModsGuild: isInModsGuild,
                isDeveloper: isDeveloper
            });
            const saveUser = await newUser.save();
            done(null, saveUser);
        }
    } catch (err) {
        console.log(err);
        done(err, null);
    }

}));