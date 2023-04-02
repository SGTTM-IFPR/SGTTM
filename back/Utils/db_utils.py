
class DbUtils:
    @staticmethod
    def test_database_connection(app, db):
        try:
            with app.app_context():
                db.engine.connect()
                print("Database connection successful!")
        except Exception as e:
            print("Error connecting to the database:")
            print(e)