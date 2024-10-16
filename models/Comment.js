const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  cvId: { type: mongoose.Schema.Types.ObjectId, ref: 'CV', required: true }, // Associe le commentaire à un CV spécifique
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Utilisateur ayant écrit le commentaire
  content: { type: String, required: true }, // Contenu du commentaire
  createdAt: { type: Date, default: Date.now } // Date de création du commentaire
});

module.exports = mongoose.model('Comment', commentSchema);
