import os
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

#app.secret_key = "secret key"
