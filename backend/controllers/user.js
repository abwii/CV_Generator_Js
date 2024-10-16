const mongoose = require("mongoose");
const UserModel = require("./../models/User");
const bcrypt = require("bcrypt");
module.exports = {
  getUserInfos: (req, res) => {
    const { id, firstname, lastname, email, phone } = req.user;
    res.send({
      id,
      lastname,
      firstname,
      email,
      phone,
    });
  },
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const { oldPassword } = req.body;
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send({ message: "Cannot find user to update" });
      }
      // Si un ancien mot de passe est fourni, vérifier sa validité
      if (oldPassword) {
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          return res.status(400).send({
            message: "Ancien mot de passe incorrect",
          });
        }
      }
      // Préparer un objet vide pour les champs à mettre à jour
      const updatedUserData = {};

      // Parcourir les champs possibles et les ajouter à updatedUserData s'ils sont présents dans req.body
      const { lastname, firstname, email, phone, password, adress, picture } =
        req.body;

      if (lastname) updatedUserData.lastname = lastname;
      if (firstname) updatedUserData.firstname = firstname;
      if (email) updatedUserData.email = email;
      if (phone) updatedUserData.phone = phone;
      if (adress) updatedUserData.adress = adress;
      if (picture) updatedUserData.picture = picture;

      // Si le mot de passe est fourni, on le hache avant la mise à jour
      if (password) {
        const hash = await bcrypt.hash(password, 10);
        updatedUserData.password = hash;
      }

      // Valide les nouvelles données utilisateur si nécessaire (facultatif)
      /* verifyUser({ ...user.toObject(), ...updatedUserData }); */

      // Met à jour l'utilisateur en base de données uniquement avec les champs fournis
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: updatedUserData }, // Utiliser $set pour ne mettre à jour que les champs définis
        { new: true, runValidators: true } // Pour retourner l'utilisateur mis à jour
      );

      // Vérifie si la mise à jour a bien eu lieu
      if (!updatedUser) {
        return res.status(500).send({
          message: `Impossible de mettre à jour l’utilisateur avec =${userId}`,
        });
      }

      // Renvoie l'utilisateur mis à jour
      res.send(updatedUser);
    } catch (error) {
      res.status(500).send({
        message:
          error.message ||
          `Erreur de mise à jour de l’utilisateur avec id=${userId}`,
      });
    }
  },
};
