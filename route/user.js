const express = require('express');
const routeur = express.Router();
const Utilisateur = require('../model/user');

routeur.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const utilisateurExistant = await Utilisateur.findOne({ email });
        if (utilisateurExistant) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }
        const nouvelUtilisateur = new Utilisateur({ name: name, email: email, password: password });
        await nouvelUtilisateur.save();
        res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
    } catch (erreur) {
        console.error('Erreur lors de l\'inscription :', erreur);
        res.status(500).json({ message: 'Erreur.' });
    }
});

routeur.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const utilisateur = await Utilisateur.findOne({ email });
        if (!utilisateur) {
            return res.status(400).json({ message: 'Utilisateur non trouvé.' });
        }
        if (utilisateur.password !== password) {
            return res.status(400).json({ message: 'Mot de passe incorrect.' });
        }
        res.status(200).json({ message: 'Connexion réussie.', utilisateur });
    } catch (erreur) {
        console.error('Erreur lors de la connexion :', erreur);
        res.status(500).json({ message: 'Erreur.' });
    }
});

module.exports = routeur;
