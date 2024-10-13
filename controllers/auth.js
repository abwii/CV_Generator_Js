const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyUser } = require("../validator/user");

module.exports = {
  // POST /register - Créer un utilisateur
  register: async (req, res) => {
    try {
      // Validation des données
      verifyUser(req.body);
      const { nom, prenom, email, numeroTel, password, ville, photoProfil } =
        req.body;

      // Hashage du mot de passe
      const hash = await bcrypt.hash(password, 10);

      // Création d'un nouvel utilisateur
      const newUser = new UserModel({
        nom,
        prenom,
        email,
        numeroTel,
        password: hash,
        ville, // Optionnel
        photoProfil, // Optionnel
      });

      // Sauvegarde de l'utilisateur
      await newUser.save();

      // Réponse avec les informations de l'utilisateur
      res.status(201).send({
        id: newUser._id,
        nom: newUser.nom,
        prenom: newUser.prenom,
        email: newUser.email,
        numeroTel: newUser.numeroTel,
        ville: newUser.ville,
        photoProfil: newUser.photoProfil,
      });
    } catch (error) {
      res.send({
        message: error.message || "Impossible d'enregistrer l'utilisateur",
      });
    }
  },

  // POST /login - Authentification
  login: async (req, res) => {
    const { email, password } = req.body;

    // Recherche de l'utilisateur par email
    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      return res.status(401).send({
        message: "L’utilisateur n’existe pas",
      });
    }

    // Vérification du mot de passe
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      // Préparation des informations pour le JWT
      const jwtOptions = {
        expiresIn: process.env.JWT_TIMEOUT_DURATION || "1h",
      };
      const secret = process.env.JWT_SECRET || "secret";

      // Génération du token JWT
      const token = jwt.sign(
        {
          userId: user._id,
        },
        secret,
        jwtOptions
      );

      // Réponse de succès avec les informations de l'utilisateur
      res.send({
        message: "Connexion réussie",
        user: {
          id: user._id,
          nom: user.nom,
          prenom: user.prenom,
          token,
        },
      });
    } else {
      res.status(401).send({
        message: "Données de connexion erronées",
      });
    }
  },
};
