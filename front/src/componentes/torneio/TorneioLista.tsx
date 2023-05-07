import { useEffect, useState } from "react";
import { Button, Card, Layout } from "antd";
import { ModificarEnumTipoTorneio } from "./ModificarEnumTipoTorneio";
import { getAllTournaments, getTournamentById } from "../../servicos/TorneioServico";
import { TorneioData } from "../../datas/TorneioData";
import { InscricaoData } from "../../datas/InscricaoData";
import { BotaoCriarInscricao } from "../inscricao/BotaoCriarInscricao";

const { Content } = Layout;

export const TorneioLista = () => {
    const [dataCard, setDataCard] = useState<TorneioData[]>([]);
    const [dataInscricao, setDataInscricao] = useState<InscricaoData[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getAllTournaments();
            setDataCard(data);
        }
        fetchData();
    }, []);

    return (
        // so mostrar se start for false
        <Layout>
            <Content style={{ padding: "50px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    {dataCard.map((tournament) => (
                        <Card
                            key={tournament.id}
                            style={{ width: 300 }}
                        // cover={<img alt="example" src={tournament.image} />}
                        >
                            <h2>{tournament.nome}</h2>
                            <p>
                                <b>Data de início: </b>
                                {tournament.data_inicio}
                            </p>
                            <p>
                                <b>Data de término: </b>
                                {tournament.data_final}
                            </p>
                            <p>
                                <b>Local: </b>
                                {tournament.local}
                            </p>
                            <p>
                                <b>Tipo do torneio: </b>
                                {tournament.tipo_torneio}
                            </p>
                            {tournament.status === "Aberto" ? (
                                <BotaoCriarInscricao setData={setDataInscricao} idTournament={tournament.id} />
                            ) : null}
                        </Card>
                    ))}
                </div>
            </Content>
        </Layout>
    );
};
