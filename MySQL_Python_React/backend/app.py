from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    prenom = db.Column(db.String(50))
    nom = db.Column(db.String(50))
    email = db.Column(db.String(100), unique=True)

    def __init__(self, prenom, nom, email):
        self.prenom = prenom
        self.nom = nom
        self.email = email

    def save(self):
        db.session.add(self)
        db.session.commit()

@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/api/users/add-user', methods=['POST'])
def add_user():
    try:
        data = request.json
        new_user = User(**data)
        new_user.save()
        return jsonify({"message": "Utilisateur créé", "prenom": new_user.prenom}), 201
    except Exception as e:
        return jsonify({"message": "Erreur lors de la création de l'utilisateur", "error": str(e)}), 500

@app.route('/api/users/get-all-users')
def get_all_users():
    try:
        users = User.query.all()
        return jsonify(users), 200
    except Exception as e:
        return jsonify({"message": "Erreur lors de la récupération de la liste des utilisateurs", "error": str(e)}), 500

@app.route('/api/users/delete-user/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        deleted_user = User.query.filter_by(id=user_id).delete()
        if deleted_user:
            return jsonify({"message": "Utilisateur supprimé avec succès", "deletedUser": deleted_user}), 200
        else:
            return jsonify({"message": "Utilisateur non trouvé"}), 404
    except Exception as e:
        return jsonify({"message": "Erreur lors de la suppression de l'utilisateur", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
