from consumer.config import Config
from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    "sale-log",
    bootstrap_servers=Config.KAFKA_BOOTSTRAP_SERVER_URI,
    auto_offset_reset="latest",
    value_deserializer=lambda m: json.loads(m.decode("utf-8")),
)


def process_logs():
    for message in consumer:
        print(f"O que eu recebi: {message.value}")


if __name__ == "__main__":
    process_logs()
