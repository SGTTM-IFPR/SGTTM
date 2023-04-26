from enum import Enum


class ConditionEnum(Enum):
    TEACHER_IFPR = 'Professor IFPR'
    STUDENT_IFPR = 'Estudante IFPR'
    EGRESS_IFPR = 'Egresso IFPR'
    GUEST = 'Convidado'
    OTHERS = 'Outros'
