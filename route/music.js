const express = require('express');
const routeur = express.Router();
const multer = require('multer');
const telechargement = multer({ dest: 'uploads/' });
const Musique = require('../model/music');

const uploadFichiers = telechargement.fields([{ name: 'music', maxCount: 1 }, { name: 'image', maxCount: 1 }]);

routeur.post('/', uploadFichiers, function (req, res, next) {
    console.log("Page musique", req.files);

    if (req.files.image) {
        Musique.create({
            path: req.files.music[0].path,
            image: req.files.image[0].path,
            name: req.body.name,
        });
    } else {
        Musique.create({
            path: req.files.music[0].path,
            name: req.body.name,
        });
    }

    res.json({ message: 'Musique téléchargée avec succès !' });
});

routeur.get('/list', async (req, res) => {
    try {
        const musiques = await Musique.find();
        res.json(musiques);
    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ message: 'Erreur.' });
    }
});

module.exports = routeur;
