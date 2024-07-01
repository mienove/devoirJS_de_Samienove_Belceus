const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');


const app = express();
const PORT = 8080;
const commmentFile = path.join(__dirname, "commentaires.txt");

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css',  express.static(path.join(__dirname, 'public/css')));
app.use('/Images',  express.static(path.join(__dirname, 'public/Images')));
app.use('/js',  express.static(path.join(__dirname, 'public/js')));
app.use('/views',  express.static(path.join(__dirname, 'public/views')));
// Tableau pour stocker les commentaires (simulé en mémoire)
let comments = [];

// Route pour servir les fichiers statiques
// app.use(express.static('public'));
// app.use(express.static('Images'));





// Route pour ajouter un nouveau commentaire
app.post('/comments', (req, res) => {
    image = '..\\Images\\image marketing.jpg';
    const {name, commentText} = req.body;
    const newKomante = {
        'name': name, 
        'commentText': commentText,
        'image': image
    };
    
    fs.readFile(commmentFile, 'utf-8', (err, data)=>{
        if (err){
            console.error('erreur de lecture fichier: ', err);
            return res.sendStatus(500);
        }
        
        // ekri nan fichye a
        fs.appendFile(commmentFile, JSON.stringify(newKomante) + '\n', (err)=>{
            if(err){
                console.error('erreur pendant l\'ajout  du commentaire.');
                return res.status(500).send('erreur d\'ajout de commentaires.');
            }
            res.sendStatus(200);
        });
    });
});
// Route pour récupérer les 10 derniers commentaires
app.get('/get-comments', (req, res) => {
    fs.readFile(commmentFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier :', err);
            return res.status(500).send('Erreur lors de la lecture du fichier.');
        }
        //const komante2 = data ? JSON.parse(data): [];
        //console.log(komante2);
        //const diskomate = komante2.slice(-10);
       // console.log(komante2);
        //console.log(data);
        const formattedComment = data.trim().split('\n').map(ligne => JSON.parse(ligne)).slice(-10);
        res.json(formattedComment);
    });
    
});


app.post('/send-message', (req, res) => {
    const {email,message, name} = req.body;
    console.log(name, email, message);
    const mailOption = {
        from: 'samienovebelceus07@gmail.com',
        to: 'christinestpreuxm40@gmail.com',
        subject: 'nouvelle soummision de formulaire',
        text: `nom: ${name} \n email: ${email}\n message: ${message}`
    };
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'samienovebelceus07@gmail.com',
            pass: 'qzgf gifs juin yixj'
        }
    });
    transporter.sendMail(mailOption, (err, info)=>{
        if(err){
            console.log("erreur lors de l'envoi");
            console.log(err);
            return res.status(500).send('erreur de serveur');
        }
        res.json({success: true, message: ' message envoye avec succes'});
        alert('Nous avons recu votre message et nous avons envoye un mail de confirmation pour vous.');
    });
    
});

// Route pour la page principale
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/views/index.html');
});


// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
