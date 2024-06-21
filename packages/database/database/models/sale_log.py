import uuid

from database import db

from .base import BaseModel

from sqlalchemy.sql import func


class SaleLog(BaseModel):
    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))

    quantity_sold = db.Column(db.Integer, nullable=False)

    product_sold = db.Column(db.String, db.ForeignKey("product.id"), nullable=False)

    time_of_sale = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    product = db.relationship("Product", back_populates="sale_logs")

    def as_dict(self):
        return {
            "id": self.id,
            "quantity_sold": self.quantity_sold,
            "product_id": self.product_sold,
            "product_name": self.product.name,
            "time_of_sale": self.time_of_sale,
        }
