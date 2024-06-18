import uuid

from database import db

from .base import BaseModel


class Substance(BaseModel):
    name = db.Column(db.String, primary_key=True)

    products = db.relationship("Product", back_populates="substance")

    def as_dict(self):
        return {
            "name": self.name,
        }
