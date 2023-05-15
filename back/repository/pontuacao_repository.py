from model import PontuacaoModel
from model import InscricaoModel, UsuarioModel
from repository.generic_repository import GenericRepository


class PontuacaoRepository(GenericRepository):
    def __init__(self):
        super().__init__(PontuacaoModel)
    
    def get_ranking(self):
        # Obter todas as inscrições dos usuários
        inscricoes = InscricaoModel.query.all()

        # Criar um dicionário de pontuações por usuário
        pontuacoes = {}
        for inscricao in inscricoes:
            usuario_id = inscricao.usuario_id

            # Obter as pontuações do usuário
            query = self.model.query.filter_by(id_inscricao=inscricao.id)
            usuario_pontuacoes = query.all()

            # Calcular a pontuação total do usuário
            pontos = sum([pontuacao.pontos for pontuacao in usuario_pontuacoes])

            # Adicionar a pontuação total ao dicionário de pontuações
            if usuario_id not in pontuacoes:
                usuario = UsuarioModel.query.get(usuario_id)
                pontuacoes[usuario_id] = {
                    'nome': usuario.nome,
                    'pontos': pontos,
                    'clube': usuario.clube,
                    'federacao': usuario.federacao
                }
            else:
                pontuacoes[usuario_id]['pontos'] += pontos

        # Ordenar o ranking por pontos
        ranking = sorted(pontuacoes.values(), key=lambda x: x['pontos'], reverse=True)

        return ranking