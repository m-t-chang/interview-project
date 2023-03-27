from flask import Blueprint, g, jsonify, current_app, request
from flask_docker.db import Database
import openai 

api = Blueprint('api', __name__)

def get_db():
    if "db" not in g:
        g.db = Database("gpt_project")
    return g.db


@api.route('/conversations', methods=['GET'])
def get_conversations():
    return jsonify([])


@api.route('/conversation', methods=['POST'])
def create_conversation():
    return jsonify({"id": 0, "name": "Hello World"})


@api.route('/conversation/<id>', methods=['DELETE'])
def delete_conversation(id):
    return {"id": 0}


@api.route('/conversation/<id>/messages', methods=['GET'])
def get_messages(id):
    return jsonify([])


@api.route('/conversation/<conversation_id>/message', methods=['POST'])
def create_message(conversation_id):
    return jsonify({"id": 0, "query": "Hello", "response": "world"})
