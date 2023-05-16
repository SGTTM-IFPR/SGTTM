import json

from flask import request, Response, jsonify

from .partida_namespace import partida_namespace as api
from .abstract_partida_rest_controller import AbstractPartidaRestController
from ..auth_decorator import token_required


@api.route('/update-all')
class PartidaUpdateAllController(AbstractPartidaRestController):
    @token_required
    def put(self):
        '''Atualizar partidas lista'''
        partidas_data = request.json
        if (not partidas_data):
            response = {"message": "sem partidas para atualizar"}
            return Response(json.dumps(response), 400, mimetype="application/json")
        updated_partidas = self.service.update_all(partidas_data)
        updated_partidas_dicts = [partida.to_dict() for partida in updated_partidas]
        print(updated_partidas_dicts)
        return Response(json.dumps(updated_partidas_dicts), status=200, mimetype="application/json")
