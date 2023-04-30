export interface EnumOpcao {
    value: MyEnum;
    label: string;
}

export enum MyEnum {
    PROFESSOR_IFPR = 'PROFESSOR_IFPR',
    ESTUDANTE_IFPR = 'ESTUDANTE_IFPR',
    EGRESSO_IFPR = 'EGRESSO_IFPR',
    CONVIDADO = 'CONVIDADO',
    OUTROS = 'OUTROS'
}

export const enumOpcoes: EnumOpcao[] = [
    { value: MyEnum.PROFESSOR_IFPR, label: 'Professor IFPR' },
    { value: MyEnum.ESTUDANTE_IFPR, label: 'Estudante IFPR' },
    { value: MyEnum.EGRESSO_IFPR, label: 'Egresso IFPR' },
    { value: MyEnum.CONVIDADO, label: 'Convidado' },
    { value: MyEnum.OUTROS, label: 'Outros' }
];