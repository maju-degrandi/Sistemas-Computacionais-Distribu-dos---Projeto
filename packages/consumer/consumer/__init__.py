from database import db
from flask import Flask

from .config import Config

app = Flask(__name__)
app.config.from_object(Config)
app.app_context().push()

db.init_app(app)
