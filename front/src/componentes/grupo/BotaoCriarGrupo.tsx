import { Button } from "antd";
import { getInscricaoById } from "../../servicos/InscricaoServico";
import { useState } from "react";
import { InscricaoData } from "../../datas/InscricaoData";
import { updateTournament } from "../../servicos/TorneioServico";
import { TorneioData } from "../../datas/TorneioData";

type Props = {
    idTournament?: Number;
    torneioData?: TorneioData;
    onCreateGrupo: () => void;
};


export const BotaoCriarGrupo: React.FC<Props> = ({
    idTournament: idTournament,
    torneioData = {} as TorneioData,
    onCreateGrupo
}) => {
    const [dataInscricao, setDataInscricao] = useState<InscricaoData[]>([]);

    const criarGrupo = async () => {
        if (typeof idTournament == "number") {
            torneioData.status = "EM_ANDAMENTO";
            updateTournament(idTournament, torneioData);

            const InscricaoData = await getInscricaoById(idTournament);
            onCreateGrupo();
            // setDataInscricao(InscricaoData as InscricaoData[]);
        }
    };

    return (
        <Button
            size='middle'
            type="primary"
            style={{
                background: "green", marginRight: 10
            }}
            onClick={criarGrupo}
        >
            Iniciar Torneio
        </Button >
    );
};

