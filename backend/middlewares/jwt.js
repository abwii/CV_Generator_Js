const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

module.exports = {
  verifyUser: async (req, res, next) => {
    try {
      let token = req.headers["authorization"];

      if (!token) {
        return res.status(401).send({
          message: "No token provided. Unauthorized user",
        });
      }

      // Enlever "Bearer " du token
      token = token.replace("Bearer ", "");

      // Decryptage du token
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);

      // Recherche de l'utilisateur dans la base de données
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(401).send({
          message: "User not found. Unauthorized user",
        });
      }

      // Stocker l'utilisateur dans la requête
      req.user = user;
      next(); // Continuer si tout va bien
    } catch (error) {
      // Gérer les erreurs JWT (exemple : token invalide ou expiré)
      return res.status(401).send({
        message: error.message || "Invalid token. Unauthorized user",
      });
    }
  },
};
