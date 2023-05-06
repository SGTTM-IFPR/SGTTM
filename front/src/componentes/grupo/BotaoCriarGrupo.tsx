import { Button, Modal } from "antd";
import { GrupoData } from "../../datas/GrupoData";
import { getAllInscricoes, getInscricaoById } from "../../servicos/InscricaoServico";
import { useState } from "react";
import { InscricaoData } from "../../datas/InscricaoData";

type Props = {
    idTournament?: Number;
};


export const BotaoCriarGrupo: React.FC<Props> = ({
    idTournament: idTournament,
}) => {
    const [dataInscricao, setDataInscricao] = useState<InscricaoData[]>([]);

    const CriarGrupo = async () => {
        if (typeof idTournament == "number") {
            const InscricaoData = await getInscricaoById(idTournament);
            setDataInscricao(InscricaoData as InscricaoData[]);
        }

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

        </Button >
    );
};

