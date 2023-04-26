from enum import Enum


class CondicaoEnum(Enum):
    PROFESSOR_IFPR = 'Professor IFPR'
    ESTUDANTE_IFPR = 'Estudante IFPR'
    ENGRESSO_IFPR = 'Egresso IFPR'
    CONVIDADO = 'Convidado'
    OUTROS = 'Outros'
