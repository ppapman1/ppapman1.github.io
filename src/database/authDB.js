const mongoose = require('mongoose');
module.exports = mongoose.connect('mongodb://localhost:27017/discordauth', { useUnifiedTopology: true, useNewUrlParser: true });