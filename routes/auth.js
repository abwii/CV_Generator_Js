const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
    const { nom, prenom, email, password, numeroTel, ville, photoProfil } = req.body;
    
    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'L\'utilisateur existe déjà.' });
      }
  
      // Hasher le mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Créer un nouvel utilisateur
      const newUser = new User({
        nom,
        prenom,
        email,
        password: hashedPassword,
        numeroTel,
        ville,
        photoProfil,  // Optionnel
      });
  
      await newUser.save();
      res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur.' });
    }
  });
  

// Connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    // Créer et retourner le token JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

module.exports = router;
