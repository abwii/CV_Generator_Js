const mongoose = require("mongoose");

module.exports = {
  getUserInfos: (req, res) => {
    const { id, prenom, nom, email, numeroTel } = req.user;
    res.send({
      id,
      nom,
      prenom,
      email,
      numeroTel,
    });
  },
};
