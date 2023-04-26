import React from "react";
import { EnumOpcao, MyEnum } from "./EnumOpcao";

interface Props {
    options: EnumOpcao[];
    value: MyEnum;
    onChange: (value: MyEnum) => void;
}

export const SelecaoEnum: React.FC<Props> = ({ options, value, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const enumValue = mapStringToEnum(selectedValue) ?? MyEnum.TEACHER_IFPR;
        onChange(enumValue);
    };

    const mapStringToEnum = (value: string): MyEnum | undefined => {
        switch (value) {
            case "TEACHER_IFPR":
                return MyEnum.TEACHER_IFPR;
            case "STUDENT_IFPR":
                return MyEnum.STUDENT_IFPR;
            case "EGRESS_IFPR":
                return MyEnum.EGRESS_IFPR;
            case "GUEST":
                return MyEnum.GUEST;
            case "OTHERS":
                return MyEnum.OTHERS;
            default:
                return undefined;

        }
    };

    return (
        <select onChange={handleChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};
