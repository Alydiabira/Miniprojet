const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    prenom: {type : 'String', required: true},
    nom: {type : 'String'},
    email: {type : 'String', required: true, unique: true},
    // message: {type : 'String'}
})

module.exports = mongoose.model('Contact', contactSchema);