const express = require("express");
const router = express.Router();
const cvController = require("../controllers/cv");

router.get("/all", cvController.getAllCV);

module.exports = router;
