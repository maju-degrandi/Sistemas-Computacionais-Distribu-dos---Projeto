from .config import Config
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers=Config.KAFKA_BOOTSTRAP_SERVER_URI,
    value_serializer=lambda v: json.dumps(v).encode("utf-8"),
)


def send_sale_log_message(product_id: str, quantity_sold: int):
    producer.send(
        "sale-log",
        value={"product_id": product_id, "quantity_sold": quantity_sold},
    )
    producer.flush()
