const express = require("express");
const port = 5000;
const app = express();
const mongoose = require("mongoose");
require ("dotenv").config();


// Middleware
app.use(express.json(),
);

// Connexion à la base de données
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connexion à la base de données réussie."))
.catch((err) => console.log("Erreur de connexion à la base de données."));

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen(port, () => console.log("Le serveur a démarré au port " + port));