// // server.js

// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Utilisation de bodyParser pour pouvoir parser les requêtes POST
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Définir le chemin vers le fichier de commentaires
// const commentFilePath = path.join(__dirname, 'comments.txt');

// // Endpoint GET pour récupérer les commentaires
// app.get('/api/comments', (req, res) => {
//     // Lire les commentaires depuis le fichier texte
//     fs.readFile(commentFilePath, 'utf8', (err, data) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Erreur lors de la lecture des commentaires.');
//             return;
//         }
//         const comments = data.split('\n').filter(comment => comment.trim() !== '');
//         res.json(comments);
//     });
// });

// // Endpoint POST pour ajouter un commentaire
// app.post('/api/comments', (req, res) => {
//     const newComment = req.body.comment;
//     if (!newComment || newComment.trim() === '') {
//         res.status(400).send('Le commentaire ne peut pas être vide.');
//         return;
//     }

//     // Ajouter le nouveau commentaire au fichier texte
//     fs.appendFile(commentFilePath, `${newComment}\n`, 'utf8', (err) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Erreur lors de l\'ajout du commentaire.');
//             return;
//         }
//         res.status(201).send('Commentaire ajouté avec succès.');
//     });
// });

// // Démarrer le serveur
// app.listen(PORT, () => {
//     console.log(`Serveur démarré sur le port ${PORT}`);
// });

const express = require('express');
const app = express();
const port = 3000;

// Définir le chemin vers le fichier de commentaires
const commentFilePath = path.join(__dirname, 'comments.txt');

// Fonction pour charger tous les commentaires depuis le fichier texte
function getAllComments(callback) {
    fs.readFile(commentFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier:', err);
            callback([]);
            return;
        }
        // Diviser les données en lignes pour obtenir chaque commentaire
        const comments = data.split('\n').filter(comment => comment.trim() !== '');
        callback(comments);
    });
}

// Endpoint pour récupérer tous les commentaires
app.get('/comments', (req, res) => {
    getAllComments(comments => {
        res.json(comments);
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
