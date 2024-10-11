const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  numeroTel: {
    type: String,
    required: true,
  },
  ville: {
    type: String,
    required: true,
  },
  photoProfil: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
