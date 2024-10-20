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
      if (oldPassword) {
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          return res.status(400).send({
            message: "Old password incorrect",
          });
        }
      }

      const updatedUserData = {};

      const { lastname, firstname, email, phone, password, adress } =
        req.body;

      if (lastname) updatedUserData.lastname = lastname;
      if (firstname) updatedUserData.firstname = firstname;
      if (email) updatedUserData.email = email;
      if (phone) updatedUserData.phone = phone;
      if (adress) updatedUserData.adress = adress;

      if (password) {
        const hash = await bcrypt.hash(password, 10);
        updatedUserData.password = hash;
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: updatedUserData }, 
        { new: true, runValidators: true } 
      );

      if (!updatedUser) {
        return res.status(500).send({
          message: `Unable to update user with id=${userId}`,
        });
      }

      res.send(updatedUser);
    } catch (error) {
      res.status(500).send({
        message:
          error.message ||
          `Error updating user with id=${userId}`,
      });
    }
  },
};
