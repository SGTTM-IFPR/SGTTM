from flask import Flask, request, jsonify
from flask import Blueprint

from Models.Enums import TournamentTypeEnum
from Models.tournament_model import TournamentModel
from Services.tournament_service import TournamentService

routes = Blueprint('TournamentController', __name__)
tournament_service = TournamentService()

# create a new tournament
@routes.route('/', methods=['POST', 'OPTIONS'])
def create_tournament():
    try:
        tournament_data = request.json
        tournament = tournament_service.create_tournament(tournament_data)
        if type(tournament) == TournamentModel:
            return jsonify(tournament.to_dict()), 201
        else:
            return jsonify(tournament)
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)})

# get all torunaments
@routes.route('/', methods=['GET'])
def get_tournaments():
    tournaments = tournament_service.get_all_tournaments()
    tournament_dicts = [tournament.to_dict() for tournament in tournaments]
    return jsonify(tournament_dicts), 200

# get a single tournament
@routes.route('/<int:tournament_id>', methods=['GET'])
def get_tournament(tournament_id):
    tournament = tournament_service.get_tournament_by_id(tournament_id)
    if tournament:
        return jsonify(tournament.to_dict()), 200
    else:
        return jsonify({'message': 'Tournament not found'}), 404

# update a tournament
@routes.route('/<int:tournament_id>', methods=['PUT'])
def update_tournament(tournament_id):
    tournament_data = request.json
    tournament = tournament_service.update_tournament(tournament_id, tournament_data)
    if tournament:
        return jsonify(tournament.to_dict()), 200
    else:
        return jsonify({'message': 'Tournament not found'}), 404

# delete a tournament
@routes.route('/<int:tournament_id>', methods=['DELETE'])
def delete_tournament(tournament_id):
    deleted = tournament_service.delete_tournament(tournament_id)
    if deleted:
        return jsonify({'message': 'Tournament deleted successfully'}), 200
    else:
        return jsonify({'message': 'Tournament not found'}), 404