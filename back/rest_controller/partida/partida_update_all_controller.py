import json

from flask import request, Response, jsonify

from model import PartidaModel
from .partida_namespace import partida_namespace as api
from .abstract_partida_rest_controller import AbstractPartidaRestController
from ..auth_decorator import token_required


@api.route('/update-all')
class PartidaUpdateAllController(AbstractPartidaRestController):
    @token_required
    def put(self):
        '''Atualizar partidas lista'''
        partidas_data = request.json

        if not isinstance(partidas_data, list):
            response = {"message": "dados de partida inválidos"}
            return Response(json.dumps(response), 400, mimetype="application/json")

        # Convert JSON data to PartidaModel instances
        partidas = []
        for partida_data in partidas_data:
            print(partida_data)
            partida = PartidaModel(**partida_data)
            partidas.append(partida)

        updated_partidas = self.service.update_all(partidas)
        updated_partidas_dicts = [partida.to_dict() for partida in updated_partidas]

        return Response(json.dumps(updated_partidas_dicts), status=200, mimetype="application/json")
