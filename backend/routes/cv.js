const express = require("express");
const router = express.Router();
const cvController = require("../controllers/cv");
const { verifyUser } = require("../middlewares/jwt");

router.get("/all", cvController.findAllCV);
router.get("/all/:id", cvController.findCVById); //api/cv/all/:id
router.post("/create", verifyUser, cvController.createMyCV); // ou : me/cv/create
router.put("/update/:id", verifyUser, cvController.updateMyCV); // ou : me/cv/update/id, avec sans id ?
router.delete("/delete/:id", verifyUser, cvController.deleteMyCV); // ou : me/cv/delete/id, avec sans id ?
router.get("/:id", cvController.findCVByUserId);
module.exports = router;
