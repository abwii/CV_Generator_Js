const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyUser } = require("../validator/user");

module.exports = {
  register: async (req, res) => {
    try {
      verifyUser(req.body);
      const { firstname, lastname, email, phone, password, address } =
        req.body;

      const hash = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        firstname,
        lastname,
        email,
        phone,
        password: hash,
        address
      });

      await newUser.save();

      res.status(201).send({
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address
      });
    } catch (error) {
      res.send({
        message: error.message || "Unable to register user",
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      return res.status(401).send({
        message: "The user doesn't exist",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const jwtOptions = {
        expiresIn: process.env.JWT_TIMEOUT_DURATION || "1h",
      };
      const secret = process.env.JWT_SECRET || "secret";

      const token = jwt.sign(
        {
          userId: user._id,
        },
        secret,
        jwtOptions
      );

      res.send({
        message: "Successful connection",
        user: {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          token,
        },
      });
    } else {
      res.status(401).send({
        message: "Incorrect connection data",
      });
    }
  },
};
