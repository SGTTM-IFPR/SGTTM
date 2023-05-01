# from flask import Blueprint, request, jsonify
#
# from model.Enums import condicao_enum
# from model.inscricao_model import InscricaoModel
# from service.inscricao_service import InscricaoService
#
#
# InscricaoController = Blueprint('InscricaoController', __name__)
# inscricao_service = InscricaoService()
#
# @InscricaoController.route('/', methods=['POST','OPTIONS'])
# def create_inscricao():
#     try:
#         inscricao_data = request.json
#         inscricao = inscricao_service.create_inscricao(inscricao_data)
#         if type(inscricao) == InscricaoModel:
#             return jsonify(inscricao.to_dict()), 201
#         else:
#             return jsonify(inscricao)
#     except Exception as e:
#         print(e)
#         return jsonify({'error': str(e)})
#
# @InscricaoController.route('/', methods=['GET'])
# def get_inscricoes():
#     inscricoes = inscricao_service.get_all_inscricao()
#     inscricao_dicts = [inscricao.to_dict() for inscricao in inscricoes]
#     return jsonify(inscricao_dicts), 200
#
# @InscricaoController.route('/<int:inscricao_id>', methods=['DELETE'])
# def delete_inscricao(inscricao_id):
#     deleted = inscricao_service.delete_inscricao(inscricao_id)
#     if deleted:
#         return jsonify({'message': 'Inscricao deleted successfully'}), 200
#     else:
#         return jsonify({'message': 'Inscricao not found'}), 404
