const validateComment = require('../validator/commentValidator');

exports.addComment = (req, res) => {
  const { comment, userId, cvId } = req.body;

  // Utiliser le validateur
  const errors = validateComment(comment);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Logique pour ajouter le commentaire à la base de données
  Comment.create({ comment, userId, cvId })
    .then(result => res.status(201).json(result))
    .catch(error => res.status(500).json({ error: 'Erreur lors de l\'ajout du commentaire' }));

  // Simuler la réponse pour le moment
  res.status(201).json({ message: 'Commentaire ajouté avec succès' });
};
