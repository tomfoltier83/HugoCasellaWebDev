import React from "react";
import "./Info.css"

function Info({ success }) {
  return (
    <div className="container">
      {success ? (
        <div className="info-success">
          <h4>Félicitations !</h4>
          <p>Utilisateur enregistré avec succès.</p>
        </div>
      ) : (
        <div className="info-error">
          <h4>Erreur...</h4>
          <p>L'utilisateur n'a pas pu être enregistré.</p>
        </div>
      )}
    </div>
  );
}

export default Info;
