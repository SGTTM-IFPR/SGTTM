from .set_namespace import set_namespace as api
from .abstract_set_rest_controller import AbstractSetRestController


@api.route('/find-all')
class SetListController(AbstractSetRestController):

    def get(self):
        '''Listar todos os sets'''
        sets = self.service.get_all()
        set_dicts = [set.to_dict() for set in sets]
        try:
            return set_dicts, 200
        except Exception:
            print(Exception)
        return 'Hello word', 200
