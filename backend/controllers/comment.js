const validateComment = require('../validator/commentValidator');
const Comment = require('../models/comment');

exports.addComment = (req, res) => {
  const { content, userId, cvId } = req.body;

  // Utiliser le validateur
  const errors = validateComment(content);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Logique pour ajouter le commentaire à la base de données
  const newComment = new Comment({
    content,
    userId,
    cvId,
    createdAt: new Date()
  });

  newComment.save()
  .then(savedComment => {
    res.status(201).json({ message: 'Commentaire ajouté avec succès', comment: savedComment });
  })
  .catch(error => {
    console.error(error);  // Ajouter cette ligne pour afficher l'erreur dans la console
    res.status(500).json({ error: 'Erreur lors de l\'ajout du commentaire' });
  });
};

// supprimer un commentaire
exports.deleteComment = (req, res) => {

  console.log(req.params);

  const { commentId } = req.params;

  Comment.findByIdAndDelete(commentId)
    .then(deletedComment => {
      if (!deletedComment) {
        return res.status(404).json({ error: 'Commentaire non trouvé' });
      }
      res.status(200).json({ message: 'Commentaire supprimé avec succès' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la suppression du commentaire' });
    });
};