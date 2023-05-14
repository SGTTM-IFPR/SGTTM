import moment from 'moment';

interface Props {
    data: string;
}

const formatarData = (data: string): string => {
    return moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY');
};

export const DataFormatada: React.FC<Props> = ({ data }) => {
    const dataFormatada = formatarData(data);

    return <span>{dataFormatada}</span>;
};



