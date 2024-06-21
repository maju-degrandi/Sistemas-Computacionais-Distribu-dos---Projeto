import uuid

from database import db

from .base import BaseModel


class Laboratory(BaseModel):
    cnpj = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)

    def as_dict(self):
        return {
            "cnpj": self.cnpj,
            "name": self.name,
        }
