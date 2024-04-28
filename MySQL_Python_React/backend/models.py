from app import db

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
