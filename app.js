const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://localhost:27017/Spotify')
    .then(() => console.log('Connecté à MongoDB'))
    .catch((error) => console.error('Erreur de connexion à MongoDB', error));

app.use('/user', require('./route/user'));
app.use('/music', require('./route/music'));

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
