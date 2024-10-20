const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

module.exports = {
  verifyUser: async (req, res, next) => {
    try {
      let token = req.headers['authorization'];

      if (!token) {
        return res.status(401).send({
          message: 'No token provided. Unauthorized user',
        });
      }

      token = token.replace('Bearer ', '');

      const { userId } = jwt.verify(token, process.env.JWT_SECRET);

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(401).send({
          message: 'User not found. Unauthorized user',
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).send({
        message: error.message || 'Invalid token. Unauthorized user',
      });
    }
  },
};
