from backend.hooks import load_model
from database.models import Product
from flask import Blueprint, g, jsonify, request, session

bp = Blueprint("product", __name__, url_prefix="/products")


@bp.route("/", methods=["GET"])
def get_products():
    products = Product.query.all()

    product_list = [product.as_dict() for product in products]

    return jsonify({"products": product_list})


@bp.route("/<string:product_id>", methods=["GET"])
@load_model(Product)
def get_product(product_id, product):
    if not product:
        return jsonify({"message": "Product not found."}), 404

    return jsonify(product.as_dict())


@bp.route("/<string:product_id>", methods=["DELETE"])
@load_model(Product)
def delete_product(product_id, product):
    if not product:
        return jsonify({"message": "Product not found."}), 404

    Product.delete_by(id=product_id)

    return jsonify({"message": "Product deleted."})
