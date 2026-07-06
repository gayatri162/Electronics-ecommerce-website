from flask import Flask, request, jsonify
from flask_cors import CORS
from database import products, users

import bcrypt

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend Running Successfully!"

@app.route("/products", methods=["GET"])
def get_products():
    data = list(products.find({}, {"_id": 0}))
    return jsonify(data)

@app.route("/users")
def get_users():
    data = list(users.find({}))
    print("USERS IN DB:", data)
    return jsonify(data)

@app.route("/products", methods=["POST"])
def add_product():
    product = request.json
    products.insert_one(product)

    return jsonify({
        "message": "Product Added Successfully!"
    }), 201

@app.route("/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):

    updated_data = request.json

    result = products.update_one(
        {"id": product_id},
        {"$set": updated_data}
    )

    if result.modified_count > 0:
        return jsonify({"message": "Product Updated Successfully!"})

    return jsonify({"message": "Product Not Found"}), 404

@app.route("/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):

    result = products.delete_one({"id": product_id})

    if result.deleted_count > 0:
        return jsonify({
            "message": "Product Deleted Successfully!"
        })

    return jsonify({
        "message": "Product Not Found!"
    }),404

@app.route("/register", methods=["POST"])
def register():

    user = request.json

    existing_user = users.find_one({
        "email": user["email"]
    })

    if existing_user:
        return jsonify({
            "message": "Email already exists!"
        }),400

    password = user["password"]

    hashed_password = bcrypt.hashpw(
    password.encode("utf-8"),
    bcrypt.gensalt()
)

    user["password"] = hashed_password.decode("utf-8")

    users.insert_one(user)

    return jsonify({
        "message":"User Registered Successfully!"
    }),201


if __name__ == "__main__":
    app.run(debug=True, port=8000)