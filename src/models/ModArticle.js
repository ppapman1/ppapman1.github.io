const mongoose = require('mongoose');

const ModSchema = new mongoose.Schema({
    name: { type: String, require: true },
    downloadLink: { type: Array, require: true },
    repositoryLink: { type: String, require: false },
    authorName: { type: String, require: true },
    authorID: { type: String, require: true },
    supportVersion: { type: Array, require: true },
    version: { type: String, require: true },
    briefFeatures: { type: String, require: true },
    allFeatrues: { type: String, require: true },
    dependencyMods: { type: String, require: false },
    category: { type: String, require: true }
});

const ModArticle = module.exports = mongoose.model('Mod', ModSchema);