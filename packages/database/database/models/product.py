import uuid

from database import db

from .base import BaseModel


class Product(BaseModel):
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))

    name = db.Column(db.String, nullable=False)

    quantity_in_stock = db.Column(db.Integer, nullable=False)

    substance_name = db.Column(
        db.String, db.ForeignKey("substance.name"), nullable=False
    )

    laboratory_cnpj = db.Column(
        db.String, db.ForeignKey("laboratory.cnpj"), nullable=False
    )

    substance = db.relationship("Substance", back_populates="products")
    laboratory = db.relationship("Laboratory", backref="product")
    sale_logs = db.relationship("SaleLog", back_populates="product")

    def as_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "quantity_in_stock": self.quantity_in_stock,
            "substance_name": self.substance_name,
            "laboratory_name": self.laboratory.name,
            "laboratory_cnpj": self.laboratory_cnpj,
        }
