# type: ignore

from backend.kafka_producer import send_sale_log_message
from backend.hooks import load_model
from database.models import Product
from flask import Blueprint, jsonify, request

bp = Blueprint("product", __name__, url_prefix="/products")


@bp.route("/", methods=["GET"])
def get_products():
    query = request.args.get("substanceName", "")

    products = Product.query.filter(Product.substance_name.like(f"%{query}%")).all()

    product_list = [product.as_dict() for product in products]

    return jsonify(product_list)


@bp.route("/<string:product_id>/sell", methods=["PATCH"])
@load_model(Product)
def sell_product(product_id, product):
    if not product:
        return jsonify({"message": "Product not found."}), 404

    quantity_to_sell = request.json["quantity"]

    if quantity_to_sell > product.quantity_in_stock:
        return (
            jsonify({"message": f"Not enough products in stock."}),
            400,
        )

    product.quantity_in_stock -= quantity_to_sell

    updated_product = product.save()

    send_sale_log_message(product_id, quantity_to_sell)

    return jsonify(updated_product.as_dict())


@bp.route("/<string:product_id>", methods=["GET"])
@load_model(Product)
def get_product(product_id, product):
    if not product:
        return jsonify({"message": "Product not found."}), 404

    return jsonify(product.as_dict())
