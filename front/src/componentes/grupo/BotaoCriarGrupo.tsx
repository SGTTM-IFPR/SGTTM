import { Button } from "antd";
import { GrupoData } from "../../datas/GrupoData";
import { getAllInscricoes } from "../../servicos/InscricaoServico";
import { useState } from "react";

type Props = {
    idTournament?: Number;
};


export const BotaoCriarGrupo: React.FC<Props> = ({
    idTournament: idTournament,
}) => {
    const [dataInscricao, setDataInscricao] = useState<GrupoData[]>([]);

    const CriarGrupo = async () => {
        console.log(idTournament);
        const InscricaoData = await getAllInscricoes();
        setDataInscricao(InscricaoData);
        console.log(dataInscricao);
    };




    return (
        <Button
            size="small"
            type="primary"
            style={{ background: "green", marginLeft: 8 }}
            onClick={CriarGrupo}
        >
            Iniciar Torneio
        </Button>
    );
};

