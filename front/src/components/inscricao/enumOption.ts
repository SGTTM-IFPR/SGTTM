export interface EnumOption {
    value: MyEnum;
    label: string;
}

export enum MyEnum {
    TEACHER_IFPR = 'TEACHER_IFPR',
    STUDENT_IFPR = 'STUDENT_IFPR',
    EGRESS_IFPR = 'EGRESS_IFPR',
    GUEST = 'GUEST',
    OTHERS = 'OTHERS'
}

export const enumOptions: EnumOption[] = [
    { value: MyEnum.TEACHER_IFPR, label: 'Professor IFPR' },
    { value: MyEnum.STUDENT_IFPR, label: 'Estudante IFPR' },
    { value: MyEnum.EGRESS_IFPR, label: 'Egresso IFPR' },
    { value: MyEnum.GUEST, label: 'Convidado' },
    { value: MyEnum.OTHERS, label: 'Outros' }
];