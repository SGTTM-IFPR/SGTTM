class DbUtils:
    @staticmethod
    def test_database_connection(app, db):
        try:
            with app.app_context():
                db.engine.connect()
                db.create_all()
                print("Database connection successful!")
        except Exception as e:
            print("Error connecting to the database:")
            raise SystemExit(e)
