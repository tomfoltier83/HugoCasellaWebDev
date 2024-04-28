const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./router.js');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000' 
}));
app.use(express.json());
app.use(userRoutes);

mongoose.connect('mongodb://mongo:27017', {
  "dbName": "docker-db",
  "user": "root",
  "pass": "pass"
})
.then(() => console.log('Connecté à MongoDB'))
.catch(err => console.error('Erreur de connexion à MongoDB', err));

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
