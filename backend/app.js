const express = require("express");
const port = 5001;
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const Router = require("./routes");
const cors = require("cors");

// Autorise l'accès exterieur au serveur
app.use(cors());
// Middleware
app.use(express.json());

// Connexion à la base de données
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à la base de données réussie."))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    console.error("Full error details:", err);
  }); //console.log("Erreur de connexion à la base de données."));

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});
// Recuperation des definitions de routes
app.use("/api", Router);
app.listen(port, () => console.log("Le serveur a démarré au port " + port));
