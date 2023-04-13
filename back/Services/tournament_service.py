from Repositories.tournament_repository import TournamentRepository

class TournamentService:
    def __init__(self):
        self.tournament_repository = TournamentRepository()

    def create_tournament(self, tournament_data):
        #TODO: Regras de negócio
        tournament = self.tournament_repository.create_tournament(tournament_data)
        return tournament

    def get_all_tournaments(self):
        tournaments = self.tournament_repository.get_all_tournaments()
        return tournaments

    def get_tournament_by_id(self, tournament_id):
        tournament = self.tournament_repository.get_tournament_by_id(tournament_id)
        return tournament

    def update_tournament(self, tournament_id, tournament_data):
        tournament = self.tournament_repository.update_tournament(tournament_id, tournament_data)
        return tournament

    def delete_tournament(self, tournament_id):
        deleted = self.tournament_repository.delete_tournament(tournament_id)
        return deleted