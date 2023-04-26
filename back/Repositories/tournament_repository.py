from database import Database
from Models.torneio_model import TorneioModel

class TournamentRepository:

    def create_tournament(self, tournament_data):
        try:
            print(tournament_data)
            tournament = TorneioModel(**tournament_data)
            Database.db.session.add(tournament)
            Database.db.session.commit()
            return tournament
        except Exception as e:
            Database.db.session.rollback()
            return {'error': str(e)}, 400
    
    def get_all_tournaments(self):
        return TorneioModel.query.all()
    
    def get_tournament_by_id(self, tournament_id):
        return TorneioModel.query.filter_by(id=tournament_id).first()

    def update_tournament(self, tournament_id, tournament_data):
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