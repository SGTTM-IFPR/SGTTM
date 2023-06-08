from model import InscricaoModel, UsuarioModel, TorneioModel, PontuacaoModel
from repository.generic_repository import GenericRepository
from sqlalchemy import extract

# Restante do código...

class PontuacaoRepository(GenericRepository):
    def __init__(self):
        super().__init__(PontuacaoModel)
    
    def get_ranking(self, year=None):
        # Converter o ano fornecido para string
        year_str = str(year) if year is not None else None

        # Obter todos os torneios do ano especificado
        torneios = TorneioModel.query.filter(extract('year', TorneioModel.data_inicio) == year_str).all()

        rankings = []  # Lista de rankings por torneio

        # Criar um dicionário para armazenar as pontuações de cada torneio
        pontuacoes_torneio = {}

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
                        'clube': usuario.clube,
                        'federacao': usuario.federacao,
                        'ano': torneio.data_inicio
                    }
                pontuacoes[usuario_id][torneio.nome] = pontos  # Adicionar pontuação do usuário para o torneio atual

            # Ordenar o ranking por pontos para o torneio atual
            ranking_torneio = sorted(pontuacoes.values(), key=lambda x: x[torneio.nome], reverse=True)

            # Adicionar o ranking do torneio à lista de rankings
            rankings.append({
                'torneio': torneio.nome,
                'ranking': ranking_torneio,
                
            })

            # Adicionar as pontuações do torneio ao dicionário de pontuações por torneio
            pontuacoes_torneio[torneio.nome] = pontuacoes

        # Montar o ranking final com as colunas de pontuações por torneio
        ranking_final = []

        # Obter a lista de usuários
        usuarios = UsuarioModel.query.all()

        for usuario in usuarios:
            # Criar um dicionário para armazenar as informações do usuário
            info_usuario = {
                'nome': usuario.nome,
                'clube': usuario.clube,
                'federacao': usuario.federacao,
            }

            # Preencher as colunas de pontuações por torneio para o usuário atual
            for torneio, pontuacoes_usuario in pontuacoes_torneio.items():
                if pontuacoes_usuario.get(usuario.id):
                    info_usuario[torneio] = pontuacoes_usuario[usuario.id][torneio]
                else:
                    info_usuario[torneio] = 0

            ranking_final.append(info_usuario)

        return ranking_final, rankings