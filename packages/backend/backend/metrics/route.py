from flask import Blueprint
from prometheus_flask_exporter import PrometheusMetrics
from prometheus_flask_exporter.multiprocess import GunicornInternalPrometheusMetrics


def create_metrics_view(metrics: PrometheusMetrics | GunicornInternalPrometheusMetrics):
    bp = Blueprint("metrics", __name__, url_prefix="/metrics")

    @bp.route("/")
    @metrics.do_not_track()
    def metrics_endpoint():
        request_data, content_type = metrics.generate_metrics()

        return request_data, 200, {"Content-Type": content_type}

    return bp
