const mongoose = require('mongoose');
module.exports = mongoose.connect('mongodb://localhost:27017/adofaimods', { useUnifiedTopology: true, useNewUrlParser: true });