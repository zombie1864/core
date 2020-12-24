import json
from models import Schema
from service import AttrService
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.after_request
def add_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] =  "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    response.headers['Access-Control-Allow-Methods']=  "POST, GET, PUT, DELETE, OPTIONS"
    return response

@app.route("/attr", methods=['GET'])
def list_attr():
    return jsonify(AttrService().list())

@app.route("/attr", methods=["POST"])
def create_attr():
    data = request.form.to_dict()
    return jsonify(AttrService().create(data))

@app.route("/attr/<item_id>", methods=['PUT'])
def update_item(item_id):
    data = request.form.to_dict()
    return jsonify(AttrService().update(item_id, data))

@app.route("/attr/<item_id>", methods=['DELETE'])
def delete_item(item_id):
    return jsonify(AttrService().delete(item_id))

if __name__ == "__main__":
    Schema()
    app.run(debug=True)
