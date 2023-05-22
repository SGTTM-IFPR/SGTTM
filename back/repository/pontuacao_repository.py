from model import InscricaoModel, UsuarioModel, TorneioModel, PontuacaoModel
from repository.generic_repository import GenericRepository

class PontuacaoRepository(GenericRepository):
    def __init__(self):
        super().__init__(PontuacaoModel)
    
    def get_ranking(self):
        # Obter todos os torneios
        torneios = TorneioModel.query.all()

        rankings = []  # Lista de rankings por torneio

        for torneio in torneios:
            # Obter todas as inscrições do torneio
            inscricoes = InscricaoModel.query.filter_by(torneio_id=torneio.id).all()

            # Criar um dicionário de pontuações por usuário para o torneio atual
            pontuacoes = {}

            for inscricao in inscricoes:
                usuario_id = inscricao.usuario_id

                # Obter as pontuações do usuário para o torneio
                query = self.model.query.filter_by(id_inscricao=inscricao.id)
                usuario_pontuacoes = query.all()

                # Calcular a pontuação total do usuário para o torneio
                pontos = sum([pontuacao.pontos for pontuacao in usuario_pontuacoes])

                # Adicionar a pontuação total ao dicionário de pontuações
                if usuario_id not in pontuacoes:
                    usuario = UsuarioModel.query.get(usuario_id)
                    pontuacoes[usuario_id] = {
                        'nome': usuario.nome,
                        'pontos': pontos,
                        'clube': usuario.clube,
                        'federacao': usuario.federacao,
                    }
                else:
                    pontuacoes[usuario_id]['pontos'] += pontos

            # Ordenar o ranking por pontos para o torneio atual
            ranking_torneio = sorted(pontuacoes.values(), key=lambda x: x['pontos'], reverse=True)

            # Adicionar o ranking do torneio à lista de rankings
            rankings.append({
                'torneio': torneio.nome,
                'ranking': ranking_torneio,
            })

        return rankings
