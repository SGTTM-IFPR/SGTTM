import { Card } from "antd";
import { GrupoData } from "../../datas/GrupoData";

interface IGrupoCardProps {
    grupo?: GrupoData | null;
}

export const GrupoCard = ({ grupo }: IGrupoCardProps) => {

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