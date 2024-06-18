import uuid

from database import db

from .base import BaseModel


class Product(BaseModel):
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    substance_name = db.Column(
        db.String, db.ForeignKey("substance.name"), nullable=False
    )
    laboratory_cnpj = db.Column(
        db.String, db.ForeignKey("laboratory.cnpj"), nullable=False
    )

    substance = db.relationship("Substance", back_populates="products")
    laboratory = db.relationship("Laboratory", back_populates="products")

    def as_dict(self):
        return {
            "id": self.id,
            "substance_name": self.substance_name,
            "laboratory_cnpj": self.laboratory_cnpj,
        }
