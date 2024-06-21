from database.models import SaleLog
from consumer.config import Config
from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    "sale-log",
    bootstrap_servers=Config.KAFKA_BOOTSTRAP_SERVER_URI,
    auto_offset_reset="latest",
    value_deserializer=lambda m: json.loads(m.decode("utf-8")),
)


def process_sales():
    for message in consumer:
        sale = message.value

        SaleLog.create(
            quantity_sold=sale["quantity_sold"],
            product_sold=sale["product_id"],
        )


if __name__ == "__main__":
    process_sales()
