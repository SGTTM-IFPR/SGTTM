from Repositories.inscricao_repository import InscricaoRepository

class InscricaoService:
    def __init__(self):
        self.inscricao_repository = InscricaoRepository()

    def create_inscricao(self, inscricao_data):
        inscricao = self.inscricao_repository.create_inscricao(inscricao_data)
        return inscricao
    
    def get_all_inscricao(self):
        inscricoes = self.inscricao_repository.get_all_inscricao()
        return inscricoes
    
    def delete_inscricao(self, inscricao_id):
        deleted = self.inscricao_repository.delete_inscricao(inscricao_id)
        return deleted