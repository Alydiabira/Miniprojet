var express = require('express');

var app = express();

var path = require('path');

//bodyparser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');


//Mongodb :
var mongoose = require('mongoose');

const Contact = require('./models/Contact');

const Resultat = require('./models/Resultat');

const Post = require('./models/Post');

require('dotenv').config(); 
const  url = process.env.DATABASE_URL 


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("MongoDB connected !"))
.catch(err => console.log(err))


//METHOD OVERRIDE
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// app.get('/', function(req, res){
//     res.send("<html><body><h1>Salut le monde </h1></body></html>");
// });

//----------------------------Contact ----------------------------------------------------------------


app.get('/formulaire', function(req, res){
    res.sendFile(path.resolve('formulaire.html'));
});

app.get('/contact', function(req, res){
    res.sendFile(path.resolve('contact.html'));
});
app.post('/submit-form', function(req, res){

    var name = req.body.firstname + ' ' + req.body.lastname;
    
    res.send(name + ' Submit success !');
});

app.post('/submit-contact', function(req, res){
    // var name = req.body.firstname + ' ' + req.body.lastname;
    // var email = req.body.email;
    // res.send("Bonjour "+ name 
    //     + "<br> Merci de nous avoir contacté. Nous reviendrons vers vous à cette adresse : " + email);

    // var name ="Bonjour "+ req.body.firstname + ' ' + req.body.lastname +  "<br> Merci de nous avoir contacté. Nous reviendrons vers vous à cette adresse : " + req.body.email
    // res.send(name);
    
    // res.send("Bonjour "+ req.body.firstname + ' ' + req.body.lastname 
    //     +  "<br> Merci de nous avoir contacté. Nous reviendrons vers vous à cette adresse : " 
    //         + req.body.email);

    const Data = new Contact({
        prenom : req.body.prenom,
        nom : req.body.lastname,
        email : req.body.email,
        message : req.body.message
    })
    Data.save().then(() => {
        console.log("Data saved successfully !");
        res.redirect('/');
    }).catch(err => { console.log(err)});
});

app.get('/', function(req, res) {
    Contact.find()
    .then(data =>{
        console.log(data);
        res.render('Home', {data: data});
    })
    .catch(err => console.log(err))
});

app.get('/contact/:id', function (req, res) {
    console.log(req.params.id);
    Contact.findOne({
        _id: req.params.id
    }).then(data =>{
        res.render('Edit', {data: data});
    })
    .catch(err => console.log(err))
});

app.get('/newcontact', function (req, res) {
    res.render('NewContact');
});

app.put('/contact/edit/:id', function(req, res) {
    console.log(req.params.id);
    const Data = {
        prenom : req.body.prenom,
        nom : req.body.lastname,
        email : req.body.email,
        message : req.body.message
    }
    Contact.updateOne({_id: req.params.id}, {$set: Data})
    .then(data =>{
        console.log("Data updated");
        res.redirect('/')
    })
    .catch(err =>console.log(err));
});


app.delete('/contact/delete/:id', function(req, res) {
    Contact.findOneAndDelete({_id: req.params.id})
    .then(()=>{
        res.redirect('/');
    })
    .catch(err=>console.log(err))
});

//-----------------Miniprojet------------------------------------------------

app.get('/NewEtudiant', function (req, res) {
    res.render('EditEtudiant');
});

app.post('/submitEtudiant', function (req, res) {
    const Data = new Film({
        nom: req.body.nom,
        date : req.body.date,
        etudiant : req.body.realisateur,
        sourate: req.body.genre
    })
    Data.save().then((data) =>{
        console.log("Data saved");
        res.redirect('/')
    })
});

app.get('/resultat', function (req, res) {
    Film.find().then((data) => {
        console.log(data);
        res.render('Resultat', {data: data});
    })
});

app.get('/resultat/:id', function (req, res) {
    console.log(req.params.id);
    Film.findOne({
        _id: req.params.id
    }).then(data =>{
        res.render('EditEtudiant', {data: data});
    })
    .catch(err => console.log(err))
});

app.put('/resultat/edit/:id', function(req, res) {
    console.log(req.params.id);
    const Data = {
        nom: req.body.nom,
        date : req.body.date,
        etudiant : req.body.realisateur,
        resultat: req.body.genre
    }
    Film.updateOne({_id: req.params.id}, {$set: Data})
    .then(data =>{
        console.log("Data updated");
        res.redirect('/')
    })
    .catch(err =>console.log(err));
});

app.delete('/resultat/delete/:id', function(req, res) {
    Film.findOneAndDelete({_id: req.params.id})
    .then(()=>{
        res.redirect('/');
    })
    .catch(err=>console.log(err))
});

/****************POST/Miniprojet************/

app.get('/newpost', function(req, res) {
    res.render('NewPost');
});

app.post('/submit-post', function(req, res) {
    const Data = new Post({
        resultat : req.body.resultat,
        auteur : req.body.auteur,
        sourate : req.body.sourate
    });
    Data.save().then(()=>{
        console.log("Post saved successfully");
        res.redirect('/resultat');
    }).catch(err => console.log(err));
});


app.get('/tableau', function(req, res) {
    Post.find().then((data) => {
        res.render('Tableau', {data: data});
    })
    .catch(err => console.log(err));
});

app.get('/post/:id', function(req, res) {
    Post.findOne({_id: req.params.id})
    .then((data) => {
        res.render('EditPost', {data: data});
    })
    .catch(err => console.log(err));
});

app.put('/post/edit/:id', function(req, res) {
    const Data = ({
        resultat : req.body.resultat,
        auteur : req.body.auteur,
        sourate : req.body.sourate
    })
    Post.updateOne({_id : req.params.id}, {$set : Data})
    .then(() => {
        res.redirect('/tableau')
    })
    .catch(err => console.log(err)); 
    ;
});


app.delete('/post/delete/:id', function(req, res) {
    Post.findOneAndDelete({_id : req.params.id})
    .then(() => {
        res.redirect('/tableau')
    })
    .catch(err => console.log(err));
});

var server = app.listen(5001, function () {
    console.log("Server listening on port 5001");
});