from pymongo import MongoClient
from os import environ
def get_database():
    uri = environ.get("MONGOURI")
    connection_string = f"mongodb://{uri}"
    client = MongoClient(connection_string)
    return client