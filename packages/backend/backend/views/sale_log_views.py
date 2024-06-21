from database.models import SaleLog
from flask import Blueprint, jsonify

bp = Blueprint("sale-log", __name__, url_prefix="/sale-logs")


@bp.route("/", methods=["GET"])
def get_sales_logs():
    logs = SaleLog.query.all()

    logs_list = [log.as_dict() for log in logs]

    return jsonify(logs_list)
