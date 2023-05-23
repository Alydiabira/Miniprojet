const mongoose = require('mongoose');

const resultatSchema = mongoose.Schema({
    nom : {type : 'String'},
    date : {type : 'String'},
    etudiant : {type : 'String'},
    resultat : {type : 'String'},
})

module.exports = mongoose.model('Resultat', resultatSchema);