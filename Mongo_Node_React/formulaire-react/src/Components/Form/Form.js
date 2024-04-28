import React, { useState, useEffect } from "react";
import "./Form.css";
import Info from "../Info/Info";

function Form() {
  const [user, setUser] = useState({
    lastName: "",
    firstName: "",
    age: 0,
    email: "",
  });
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserList();
  }, []);

  function getUserList() {
    fetch("http://localhost:5000/api/users/get-all-users")
      .then((response) => response.json())
      .then((data) => {
        console.log("Liste des utilisateurs:", data);
        setUsers(data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération de la liste des utilisateurs:",
          error
        );
      });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsInfoVisible(false);
    try {
      const response = await fetch("http://localhost:5000/api/users/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      setIsInfoVisible(true);
      setFormSuccess(true);
      getUserList();
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire", error);
      setIsInfoVisible(true);
      setFormSuccess(false);
    }
  };

  const deleteUser = (userId) => {
    fetch(`http://localhost:5000/api/users/delete-user/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Utilisateur supprimé avec succès");
        } else if (response.status === 404) {
          console.log("Utilisateur non trouvé");
        } else {
          throw new Error("Erreur lors de la suppression de l'utilisateur");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
      });
      getUserList()
  };

  return (
    <div className="container">
      <div className="title">
        <h1>Formulaire d'inscription</h1>
      </div>

      <div className="subTitle">
        <h3>Renseignez vos informations :</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="field-container">
          <label htmlFor="lastName">Nom :</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Nom"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </div>

        <div className="field-container">
          <label htmlFor="firstName">Prénom :</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Prénom"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </div>

        <div className="field-container">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Adresse email"
            value={user.age}
            onChange={(e) => setUser({ ...user, age: e.target.value })}
          />
        </div>

        <div className="field-container">
          <label htmlFor="email">Adresse email :</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Adresse email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <button type="submit">Envoyer</button>
      </form>
      {isInfoVisible ? <Info success={formSuccess} /> : <></>}
      <h2>Liste des utilisateurs :</h2>
      <ul className="user-list">
        {users.length > 0 ? (
          <>
            {users.map((user) => (
              <li className="user">
                <p>{user.lastName}</p>
                <p>{user.firstName}</p>
                <p>{user.age} ans</p>
                <p>{user.email}</p>
                <button onClick={() => deleteUser(user._id)}>X</button>
              </li>
            ))}
          </>
        ) : (
          <p>Aucun utilisateur trouvé...</p>
        )}
      </ul>
    </div>
  );
}

export default Form;
