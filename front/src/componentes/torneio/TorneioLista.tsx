import { useEffect, useState } from "react";
import { Button, Card, Layout } from "antd";
import { ModificarEnumTipoTorneio } from "./ModificarEnumTipoTorneio";
import { getAllTournaments, getTournamentById } from "../../servicos/TorneioServico";
import { TorneioData} from "../../datas/TorneioData";
import { InscricaoData } from "../../datas/InscricaoData";
import { getAllInscricoes } from "../../servicos/InscricaoServico";
import { getAllUsers } from "../../servicos/UsuarioServico";
import { UsuarioData } from "../../datas/UsuarioData";

const { Content } = Layout;

export const TorneioLista = () => {
    const [dataCard, setDataCard] = useState<TorneioData[]>([]);
    const [dataInscritos, setDataInscritos] = useState<InscricaoData[]>([]);
    const [dataUsers, setUsers] = useState<UsuarioData[]>([]);
    const [start, setStart] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const data = await getAllTournaments();
            setDataCard(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const data = await getAllInscricoes();
            setDataInscritos(data);
        }
        fetchData();
    }, []);
    useEffect(() => {
        async function fetchData() {
            const data = await getAllUsers();
            setUsers(data);
        }
        fetchData();
    }, []);


    const handleStart = (id: number | undefined) => {
        //redirecionar o usuário para a página de inscrição do torneio
        console.log(id);
        setStart(true);
        const tournament = dataCard.find((tournament) => tournament.id === id);
        if (tournament) {
            setDataCard([tournament]);

            const inscritos = dataInscritos.filter((inscrito) => inscrito.torneio_id === id);
            if (inscritos.length > 0) {
                const usuariosInscritos = dataUsers.filter((user) => inscritos.some((inscrito) => inscrito.usuario_id === user.id));
                setUsers(usuariosInscritos);
            }
        }
    };

    return (
        // so mostrar se start for false
        !start && (
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
                                    {ModificarEnumTipoTorneio(tournament.tipo_torneio ?? '')}
                                </p>
                                <Button onClick={() => handleStart(tournament.id)}
                                    style={{ backgroundColor: "#4fdf29" }}>
                                    Iniciar
                                </Button>
                            </Card>
                        ))}
                    </div>
                </Content>
            </Layout>
        )) || (
            <>
                <Layout>
                    <Content style={{ padding: "50px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                            {dataCard.map((tournament) => (
                                <h2>{tournament.nome}</h2>
                            ))}
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                            {dataUsers.map((user) => (
                                <h2>{user.nome}</h2>
                            ))}
                        </div>
                    </Content>
                </Layout>
            </>
        );
};
