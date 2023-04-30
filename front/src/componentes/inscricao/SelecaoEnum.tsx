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
        const enumValue = mapStringToEnum(selectedValue) ?? MyEnum.PROFESSOR_IFPR;
        onChange(enumValue);
    };

    const mapStringToEnum = (value: string): MyEnum | undefined => {
        switch (value) {
            case "PROFESSOR_IFPR":
                return MyEnum.PROFESSOR_IFPR;
            case "ESTUDANTE_IFPR":
                return MyEnum.ESTUDANTE_IFPR;
            case "EGRESSO_IFPR":
                return MyEnum.EGRESSO_IFPR;
            case "CONVIDADO":
                return MyEnum.CONVIDADO;
            case "OUTROS":
                return MyEnum.OUTROS;
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
