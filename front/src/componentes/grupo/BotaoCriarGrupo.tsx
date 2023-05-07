import { Button, Modal } from "antd";
import { GrupoData } from "../../datas/GrupoData";
import { getAllInscricoes, getInscricaoById } from "../../servicos/InscricaoServico";
import { useState } from "react";
import { InscricaoData } from "../../datas/InscricaoData";
import { updateTournament } from "../../servicos/TorneioServico";
import { TorneioData } from "../../datas/TorneioData";
import { getTournamentById } from "../../servicos/TorneioServico";

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

    if (torneioData.status !== "Aberto") {
        return null;
    }

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

