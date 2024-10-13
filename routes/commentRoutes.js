const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Comment = require('../models/commentModel');

// Route pour ajouter un commentaire à un CV
router.post('/comments', async (req, res) => {
  const { cvId, userId, content } = req.body;

  if (!cvId || !userId || !content) {
    return res.status(400).json({ error: 'Veuillez fournir tous les champs requis.' });
  }

  // Convertir les identifiants en ObjectId
  let cvObjectId, userObjectId;
  try {
    cvObjectId = mongoose.Types.ObjectId(cvId);
    userObjectId = mongoose.Types.ObjectId(userId);
  } catch (err) {
    return res.status(400).json({ error: 'Identifiant invalide pour cvId ou userId.' });
  }

  try {
    const newComment = new Comment({
      cvId: cvObjectId,
      userId: userObjectId,
      content
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
