import { Button } from "antd";
import { getInscricaoById } from "../../servicos/InscricaoServico";
import { useState } from "react";
import { InscricaoData } from "../../datas/InscricaoData";
import { updateTournament } from "../../servicos/TorneioServico";
import { TorneioData } from "../../datas/TorneioData";

type Props = {
    idTournament?: Number;
    torneioData?: TorneioData;
};


export const BotaoCriarGrupo: React.FC<Props> = ({
    idTournament: idTournament,
    torneioData = {} as TorneioData,
}) => {
    const [dataInscricao, setDataInscricao] = useState<InscricaoData[]>([]);

    const CriarGrupo = async () => {
        if (typeof idTournament == "number") {
            torneioData.status = "EM_ANDAMENTO";
            updateTournament(idTournament, torneioData);
            const InscricaoData = await getInscricaoById(idTournament);
            setDataInscricao(InscricaoData as InscricaoData[]);
            location.reload();
        }
    };

    return (
        <Button
            size='middle'
            type="primary"
            style={{
                background: "green"
            }}
            onClick={CriarGrupo}
        >
            Iniciar Torneio
        </Button >
    );
};

