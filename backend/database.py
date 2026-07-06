from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")

db = client["techstack"]

products = db["products"]
users = db["users"]
orders = db["orders"]