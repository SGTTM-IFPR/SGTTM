import { SetStateAction, useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface FlagStatusTorneioProps extends React.HTMLAttributes<HTMLDivElement> {
    statusDefault?: string;
    onStatusChange?: (value: string) => void;
}

export const FlagStatusTorneio = ({ statusDefault = "Aberto", onStatusChange }: FlagStatusTorneioProps) => {
    const [status, setStatus] = useState(statusDefault);

    const handleStatusChange = (value: string) => {
        setStatus(value);
        if (onStatusChange) {
            onStatusChange(value);
        }
    };

    return (
        <div>
            <Select defaultValue={status} onChange={handleStatusChange} style={{ margin: "10px", width: "10%" }}>
                <Option value="Aberto">Aberto</Option>
                <Option value="Em andamento">Em andamento</Option>
                <Option value="Concluído">Concluído</Option>
            </Select>
        </div>
    );
};
