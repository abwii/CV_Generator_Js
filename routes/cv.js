const express = require("express");
const router = express.Router();
const cvController = require("../controllers/cv");
const { verifyUser } = require("../middlewares/jwt");

router.get("/all", cvController.findAllCV);
router.get("/all/:id", cvController.findCVById);
router.get("/create", cvController.createMyCV); // ou : me/cv/create
router.get("/update/:id", verifyUser, cvController.updateMyCV); // ou : me/cv/update/id, avec sans id ?
router.get("/delete/:id", verifyUser, cvController.deleteMyCV); // ou : me/cv/delete/id, avec sans id ?

module.exports = router;
