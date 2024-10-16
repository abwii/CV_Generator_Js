const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
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
    numeroTel: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    adresse: {
      type: String,
    },
    photoProfil: {
      type: String, // bonus : upload photo with library Mutler, but for now not string
    },
  },
);

module.exports = mongoose.model("User", UserSchema);
