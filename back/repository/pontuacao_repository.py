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
                usuario_pontuacoes = self.model.query.filter_by(id_inscricao=inscricao.id).all()

                # Calcular a pontuação total do usuário para o torneio
                pontos = sum([pontuacao.pontos for pontuacao in usuario_pontuacoes])

                # Adicionar a pontuação total ao dicionário de pontuações
                if usuario_id not in pontuacoes:
                    usuario = UsuarioModel.query.get(usuario_id)
                    pontuacoes[usuario_id] = {
                        'nome': usuario.nome,
                        'clube': usuario.clube,
                        'federacao': usuario.federacao,
                    }
                
                pontuacoes[usuario_id][torneio.nome] = pontos  # Adicionar pontuação do usuário para o torneio atual

            # Ordenar o ranking por pontos para o torneio atual
            ranking_torneio = sorted(pontuacoes.values(), key=lambda x: x[torneio.nome], reverse=True)

            # Adicionar o ranking do torneio à lista de rankings
            rankings.append({
                'torneio': torneio.nome,
                'ranking': ranking_torneio,
            })

            # Atualizar o dicionário de pontuações por torneio com as pontuações atualizadas
            pontuacoes_torneio[torneio] = pontuacoes

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
                    info_usuario[torneio.nome] = pontuacoes_usuario[usuario.id].get(torneio.nome, 0)
                else:
                    info_usuario[torneio.nome] = 0

            ranking_final.append(info_usuario)

        return ranking_final, rankings


    def criar_pontuacao(self, pontuacao):
        pontuacao = self.model(id_inscricao=pontuacao.id_inscricao, pontos=pontuacao.pontos, descricao=pontuacao.descricao)
        self.save(pontuacao)
        return pontuacao