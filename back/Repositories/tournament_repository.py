from database import Database
from Models.tournament_model import TournamentModel

class TournamentRepository:

    def create_tournament(self, tournament_data):
        try:
            tournament = TournamentModel(**tournament_data)
            Database.db.session.add(tournament)
            Database.db.session.commit()
            return tournament
        except Exception as e:
            Database.db.session.rollback()
            return {'error': str(e)}, 400
    
    def get_all_tournaments(self):
        return TournamentModel.query.all()
    
    def get_tournament_by_id(self, tournament_id):
        return TournamentModel.query.filter_by(id=tournament_id).first()

    def update_user(self, tournament_id, tournament_data):
        tournament = self.get_tournament_by_id(tournament_id)
        if tournament:
            for key, value in tournament_data.items():
                setattr(tournament, key, value)
            Database.db.session.commit()
            return tournament
    
    def delete_tournament(self, tournament_id):
        tournament = self.get_tournament_by_id(tournament_id)
        if tournament:
            Database.db.session.delete(tournament)
            Database.db.session.commit()
            return True
        return False