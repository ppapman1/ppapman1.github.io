const mongoose = require('mongoose');

const ModSchema = new mongoose.Schema({
    name: { type: String, require: true },
    downloadLink: { type: String, require: true },
    repositoryLink: { type: String, require: false },
    authorName: { type: String, require: true },
    authorID: { type: String, require: true },
    version: { type: String, require: true },
    briefFeatures: { type: String, require: true },
    allFeatrues: { type: String, require: true },
    dependencyMods: { type: String, require: false, default: [] },
    category: { type: String, require: true }
}, {
    timestamps: { updatedAt: 'updatedAt' }
});

const ModArticle = module.exports = mongoose.model('Mod', ModSchema);