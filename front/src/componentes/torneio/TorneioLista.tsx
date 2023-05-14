import { useEffect, useState } from "react";
import { Button, Card, Col, Layout, Row } from "antd";
import { ModificarEnumTipoTorneio } from "./ModificarEnumTipoTorneio";
import { getAllTournaments } from "../../servicos/TorneioServico";
import { TorneioData } from "../../datas/TorneioData";
import { InscricaoData } from "../../datas/InscricaoData";
import { BotaoCriarInscricao } from "../inscricao/BotaoCriarInscricao";
import { TorneioCard } from "./TorneioCard";

const { Content } = Layout;
interface Props {
    status: string;
}
export const TorneioLista: React.FC<Props> = ({ status }) => {
    const [dataCard, setDataCard] = useState<TorneioData[]>([]);
    const [dataInscricao, setDataInscricao] = useState<InscricaoData[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getAllTournaments();
            setDataCard(data);
        }
        fetchData();
    }, []);
    // Filtrar torneios abertos
    const torneiosAbertos = dataCard.filter(torneio => torneio.status === status);

    return (
        <Layout>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center", marginBottom: "20px" }}>
                    {torneiosAbertos.map((torneio) => (
                        <TorneioCard key={torneio.id} torneio={torneio} />
                    ))}
                </div>
            </div>
        </Layout>
    );

    return (
        // so mostrar se start for false
        <Layout>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center", marginBottom: "20px" }}>
                    {dataCard.map((torneio) => (
                        <TorneioCard key={torneio.id} torneio={torneio} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};
