const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    sourate : {type: 'String'},
    auteur : {type: 'String'},
    resultat : {type: 'String'}
})

module.exports = mongoose.model('Post', postSchema);