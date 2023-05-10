import { GrupoData } from "../../datas/GrupoData"

interface IFaseGrupoProps {
    grupo?: GrupoData | null;
}
export const GrupoTable = ({ grupo }: IFaseGrupoProps) => {

    if (!grupo)
        return (
            <div>t</div>
        )
    return (
        <div>
            {JSON.stringify(grupo, null, 2)}
        </div>
    )
}