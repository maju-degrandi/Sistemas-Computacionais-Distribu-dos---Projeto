import os

from dotenv import load_dotenv

load_dotenv()


class Config:
    SQLALCHEMY_DATABASE_URI = os.environ["SQLALCHEMY_DATABASE_URI"]
    KAFKA_BOOTSTRAP_SERVER_URI = os.environ["KAFKA_BOOTSTRAP_SERVER_URI"]
