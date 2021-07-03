const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const DiscordUser = require('../models/DiscordUser');

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
        console.log(profile);
        
        // TODO ★★★★ 절대 수정
        let isInModsGuild = false;
        let isDeveloper = true;

        for (let i = 0; i < profile.guilds.length; i++) {
            // This id is ADOFAI MODDING DISCORD guild id
            if (profile.guilds[i].id == 783482345373040650) {
                isInModsGuild = true;
            }
        }

        if (user) {
            await DiscordUser.findOneAndUpdate(
                { discordId: profile.id },
                { avatar: profile.avatar, username: profile.username, isInModsGuild: isInModsGuild, isDeveloper: isDeveloper },
                (err, result) => {
                    if (!err) {
                        done(null, user);
                    } else {
                        done(err, null);
                    }}
            );
            
        } else {
            const newUser = await DiscordUser.create({
                discordId: profile.id,
                username: profile.username,
                avatar: profile.avatar,
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