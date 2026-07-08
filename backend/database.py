import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

db = client["techstack"]

products = db["products"]
users = db["users"]
orders = db["orders"]