from flask import request

from .pontuacao_namespace import pontuacao_namespace as api
from .abstract_pontuacao_rest_controller import *
from ..auth_decorator import token_required

@api.route('/create/<int:torneio_id>')
class PontuacaoCreateController(AbstractPontuacaoRestController):
    # @token_required
    def get(self, torneio_id):
        resultado = []
        ids_primeira_fase = []
        ids_decimas_sextas = []
        ids_oitavas = []
        ids_quartas = []
        ids_semi = []
        ids_semi_vencedor = []
        id_final = []
        id_final_vencedor = []

        partida_repository = PartidaRepository()
        partida_service = PartidaService(partida_repository)

        partidas = partida_service.get_all_partidas_by_torneio_id(torneio_id)
        partidas_dicts = [partida.to_dict() for partida in partidas]

        for i in partidas_dicts:
            if i["etapa"] == "Primeira fase":
                ids_primeira_fase.append(i['inscricao_atleta1_id'])
                ids_primeira_fase.append(i['inscricao_atleta2_id'])
            elif i["etapa"] == "Décimas sextas de final":
                ids_decimas_sextas.append(i['inscricao_atleta1_id'])
                ids_decimas_sextas.append(i['inscricao_atleta2_id'])
            elif i["etapa"] == "Oitavas de final":
                ids_oitavas.append(i['inscricao_atleta1_id'])
                ids_oitavas.append(i['inscricao_atleta2_id'])
            elif i["etapa"] == "Quartas de final":
                ids_quartas.append(i['inscricao_atleta1_id'])
                ids_quartas.append(i['inscricao_atleta2_id'])

            elif i["etapa"] == "Semifinal":
                ids_semi.append(i['inscricao_atleta1_id'])
                ids_semi.append(i['inscricao_atleta2_id'])
                ids_semi_vencedor.append(i['vencedor_id'])
            elif i["etapa"] == "FinaL":
                id_final.append(i['inscricao_atleta1_id'])
                id_final.append(i['inscricao_atleta2_id'])
                id_final_vencedor.append(i['vencedor_id'])
        
        ids_primeira_fase = list(set(ids_primeira_fase))
        ids_primeira_fase_copy = ids_primeira_fase.copy()
        ids_decimas_sextas_copy = ids_decimas_sextas.copy()
        ids_oitavas_copy = ids_oitavas.copy()
        ids_quartas_copy = ids_quartas.copy()
        ids_semi_copy = ids_semi.copy()
        ids_final_copy = id_final.copy()

        for i in ids_primeira_fase_copy:
            if i in ids_decimas_sextas:
                ids_primeira_fase.remove(i)
            elif i in ids_oitavas:
                ids_primeira_fase.remove(i)
            elif i in ids_quartas:
                ids_primeira_fase.remove(i)
            elif i in ids_semi:
                ids_primeira_fase.remove(i)
            elif i in id_final:
                ids_primeira_fase.remove(i)

        for i in ids_decimas_sextas_copy:
            if i in ids_oitavas:
                ids_decimas_sextas.remove(i)
            elif i in ids_quartas:
                ids_decimas_sextas.remove(i)
            elif i in ids_semi:
                ids_decimas_sextas.remove(i)
            elif i in id_final:
                ids_decimas_sextas.remove(i)
        
        for i in ids_oitavas_copy:
            if i in ids_quartas:
                ids_oitavas.remove(i)
            elif i in ids_semi:
                ids_oitavas.remove(i)
            elif i in id_final:
                ids_oitavas.remove(i)
            
        for i in ids_quartas_copy:
            if i in ids_semi:
                ids_quartas.remove(i)
            elif i in id_final:
                ids_quartas.remove(i)
        
        for i in ids_semi_copy:
            if i in id_final:
                ids_semi.remove(i)
        
        resultado.append([{
            "etapa": "Primeira fase",
            "ids": ids_primeira_fase  
        },
        {
            "etapa": "Décimas sextas de final",
            "ids": ids_decimas_sextas
        },
        {
            "etapa": "Oitavas de final",
            "ids": ids_oitavas
        },
        {
            "etapa": "Quartas de final",
            "ids": ids_quartas
        },
        {
            "etapa": "Semifinal",
            "ids": ids_semi,
            "ids_vencedor": ids_semi_vencedor
        },
        {
            "etapa": "Final",
            "ids": id_final,
            "ids_vencedor": id_final_vencedor
        }
        ])

        return resultado, 200

        # if pontuacao:
        #     return pontuacao.to_dict(), 200
        # else:
        #     return {'error': 'Pontuação não encontrada'}, 404