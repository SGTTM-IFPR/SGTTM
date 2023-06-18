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
            print(i["etapa"], i["inscricao_atleta1_id"], i["inscricao_atleta2_id"])
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
            "ids": list(filter(lambda valor: valor is not None, ids_primeira_fase)) 
        },
        {
            "etapa": "Décimas sextas de final",
            "ids": list(filter(lambda valor: valor is not None, ids_decimas_sextas))
        },
        {
            "etapa": "Oitavas de final",
            "ids": list(filter(lambda valor: valor is not None, ids_oitavas))
        },
        {
            "etapa": "Quartas de final",
            "ids": list(filter(lambda valor: valor is not None, ids_quartas))
        },
        {
            "etapa": "Semifinal",
            "ids": list(filter(lambda valor: valor is not None, ids_semi)),
            "ids_vencedor": list(filter(lambda valor: valor is not None, ids_semi_vencedor))
        },
        {
            "etapa": "Final",
            "ids": list(filter(lambda valor: valor is not None, id_final)),
            "ids_vencedor": list(filter(lambda valor: valor is not None, id_final_vencedor))
        }
        ])

        dicionario = {}

        for etapa in resultado[0]:
            etapa_nome = etapa["etapa"]
            pontos = 0

            if etapa_nome == "Quartas de final":
                pontos = 45
            elif etapa_nome == "Oitavas de final":
                pontos = 30
            elif etapa_nome == "Décimas sextas de final":
                pontos = 20
            elif etapa_nome == "Primeira fase":
                pontos = 10
            
            if etapa_nome == "Final":
                ids_1 = etapa["ids"]
                ids = etapa["ids_vencedor"]
                for id in ids:
                    dicionario[id] = {"pontos": 100, "id_torneio": torneio_id, "id_inscricao": id}
                for id in ids_1:
                    if id not in ids:
                        dicionario[id] = {"pontos": 85, "id_torneio": torneio_id, "id_inscricao": id}
            
            elif etapa_nome == "Semifinal":
                ids = etapa["ids"]
                ids_vencedor = etapa["ids_vencedor"]
                
                for i in resultado[0]:
                    if i["etapa"] == "Final":
                        vencedor = i

                id_primeiro_lugar = vencedor["ids_vencedor"][0]
                id_segundo_lugar = list(set(vencedor["ids"]) - set([id_primeiro_lugar]))[0]
                
                posicao_primeiro_lugar = ids_vencedor.index(id_primeiro_lugar)
                posicao_segundo_lugar = ids_vencedor.index(id_segundo_lugar)

                id_terceiro_lugar = list(set(ids) - set(ids_vencedor))[posicao_primeiro_lugar]
                id_quarto_lugar = list(set(ids) - set(ids_vencedor))[posicao_segundo_lugar]

                for id in ids:
                    if id == id_terceiro_lugar:
                        dicionario[id] = {"pontos": 70, "id_torneio": torneio_id, "id_inscricao": id}
                    if id == id_quarto_lugar:
                        dicionario[id] = {"pontos": 60, "id_torneio": torneio_id, "id_inscricao": id}
            
            else:
                ids = etapa["ids"]
            
                for id in ids:
                    dicionario[id] = {"pontos": pontos, "id_torneio": torneio_id, "id_inscricao": id}

        for i in dicionario:
            print(dicionario[i])
            PontuacaoRepository().create(dicionario[i])
            

        return resultado, 200

        # if pontuacao:
        #     return pontuacao.to_dict(), 200
        # else:
        #     return {'error': 'Pontuação não encontrada'}, 404