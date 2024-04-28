const express = require("express");
const router = express.Router();
const User = require("./models/User");

router.use(express.json());

router.get("/", (req, res) => {
  res.send("Hello World!");
});

//Ajout d'un nouvel utilisateur
router.post("/api/users/add-user", async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new User(req.body);
    console.log("new user :", newUser);
    await newUser.save();
    res
      .status(201)
      .send({ message: "Utilisateur créé", prenom: newUser.prenom });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erreur lors de la création de l'utilisateur", error });
  }
});

//Récupération de la liste des utilisateurs
router.get("/api/users/get-all-users", async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).send(users);
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Erreur lors de la récupération de la liste des utilisateurs",
        error,
      });
  }
});

//Suppression d'un utilisateur
router.delete('/api/users/delete-user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).send({ message: 'Utilisateur supprimé avec succès', deletedUser });
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
  }
});

module.exports = router;
