# type: ignore

from backend.kafka_producer import send_sale_log_message
from backend.hooks import load_model
from database.models import Product
from flask import Blueprint, jsonify, request
from flask_sqlalchemy.pagination import Pagination

bp = Blueprint("product", __name__, url_prefix="/products")


@bp.route("/", methods=["GET"])
def get_products():
    query = request.args.get("name", "")
    page = request.args.get("page", 1, type=int)

    paginated_products: Pagination = (
        Product.query.filter(Product.name.ilike(f"%{query}%"))
        .order_by(Product.name)
        .paginate(
            page=page,
            per_page=10,
            error_out=False,
        )
    )

    product_list = [product.as_dict() for product in paginated_products.items]

    return jsonify(
        {
            "products": product_list,
            "total": paginated_products.total,
            "pages": paginated_products.pages,
            "page": paginated_products.page,
        }
    )


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
