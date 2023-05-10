from enum import Enum


class CondicaoEnum(Enum):
    PROFESSOR_IFPR = 'Professor IFPR'
    ESTUDANTE_IFPR = 'Estudante IFPR'
    EGRESSO_IFPR = 'Egresso IFPR'
    CONVIDADO = 'Convidado'
    OUTROS = 'Outros'
