const router = require("express").Router();
const userController = require("./../controllers/user");
const { verifyUser } = require("../middlewares/jwt");

router.get("/me", verifyUser, userController.getUserInfos);
router.put("/:id", verifyUser, userController.updateUser);
module.exports = router;
