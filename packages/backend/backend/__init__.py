from database import db
from flask import Flask
from flask_cors import CORS

from .config import Config
from .hooks import add_headers
from .views import product_views


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.url_map.strict_slashes = False
    app.config.from_object(Config)

    register_extensions(app)
    register_hooks(app)
    register_blueprints(app)

    return app


def register_extensions(app):
    db.init_app(app)

    return app


def register_blueprints(app):
    app.register_blueprint(product_views.bp)

    return app


def register_hooks(app):
    app.after_request(add_headers)

    return app


application = create_app()
