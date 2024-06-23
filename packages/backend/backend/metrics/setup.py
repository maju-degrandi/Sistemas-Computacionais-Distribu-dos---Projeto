import os
from prometheus_flask_exporter import PrometheusMetrics
from prometheus_flask_exporter.multiprocess import GunicornInternalPrometheusMetrics

from .route import create_metrics_view


def create_metrics():
    if os.getenv("FLASK_ENV") == "production":
        return GunicornInternalPrometheusMetrics.for_app_factory(path=None)
    else:
        return PrometheusMetrics.for_app_factory(path=None)


def register_metrics(app):
    metrics = create_metrics()
    metrics_view = create_metrics_view(metrics)

    print("metrics path", metrics.path)
    print("metrics view", metrics_view.url_prefix)

    metrics.init_app(app)
    app.register_blueprint(metrics_view)

    print("app after metrics", app.url_map)

    return app
