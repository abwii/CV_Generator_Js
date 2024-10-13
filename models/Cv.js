const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Référence à l'utilisateur propriétaire du CV
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    nom: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    formations: [
      {
        diplome: String,
        intituler: String,
        dateDebut: Date,
        dateFin: Date,
        description: String,
      },
    ],
    experience: [
      {
        titrePoste: String,
        entreprise: String,
        description: String,
        dateDebut: Date,
        dateFin: Date,
      },
    ],
    skills: [String], // Liste des compétences
    visible: {
      type: Boolean,
      default: true, // CV visible par défaut
    },
    commentaire: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Référence à l'utilisateur qui laisse la recommandation
        },
        text: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true, // Ajoute les champs createdAt et updatedAt
  }
);

const CV = mongoose.model("CV", cvSchema);

module.exports = CV;
