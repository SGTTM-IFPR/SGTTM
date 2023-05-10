import { Card } from "antd";
import { GrupoData } from "../../datas/GrupoData";
import { useState, useEffect } from 'react';
import { getInscricaoByGrupoId, getInscricaoById } from "../../servicos/InscricaoServico";
import { InscricaoData } from "../../datas/InscricaoData";

interface IGrupoCardProps {
    grupo?: GrupoData | null;
}

export const GrupoCard = ({ grupo }: IGrupoCardProps) => {

    const [inscricoes, setInscricoes] = useState<InscricaoData[] | null>(null);

    useEffect(() => {
        const fetchInscricoes = async () => {
            if (!grupo || !grupo.id)
                return;
            await getInscricaoByGrupoId(grupo.id).then((inscricaoData) => setInscricoes(inscricaoData))
        };
        fetchInscricoes();
    }, [grupo, inscricoes]);
    

    if (!grupo)
        return (
            <div>t</div>
        )
    return (
        <Card title={<div>{grupo.nome}</div>}>
            <div>
                {JSON.stringify(grupo, null, 2)}
            </div>
        </Card>
    )

}