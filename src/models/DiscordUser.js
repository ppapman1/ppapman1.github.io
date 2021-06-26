const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    discordId: { type: String, require: true },
    username: { type: String, require: true },
    isInModsGuild: { type: Boolean, require: true, default: false  },
    isDeveloper: { type: Boolean, require: true, default: false }
});

const DiscordUser = module.exports = mongoose.model('User', UserSchema);