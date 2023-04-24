import { useEffect, useState } from "react";
import { Button, Card, Layout } from "antd";
import { EnumModifyTypeTournament } from "./EnumModifyTypeTournament";
import { getAllTournaments, getTournamentById } from "../../services/tournament.service";
import { TournamentData } from "../../datas/TournamentData";
import { InscricaoData } from "../../datas/InscricaoData";
import { getAllInscricoes } from "../../services/inscricao.service";
import { getAllUsers } from "../../services/user.service";
import { UserData } from "../../datas/UserData";

const { Content } = Layout;

export const TournamentList = () => {
    const [dataCard, setDataCard] = useState<TournamentData[]>([]);
    const [dataInscritos, setDataInscritos] = useState<InscricaoData[]>([]);
    const [dataUsers, setUsers] = useState<UserData[]>([]);
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
                                <h2>{tournament.name}</h2>
                                <p>
                                    <b>Data de início: </b>
                                    {tournament.date_start}
                                </p>
                                <p>
                                    <b>Data de término: </b>
                                    {tournament.date_end}
                                </p>
                                <p>
                                    <b>Local: </b>
                                    {tournament.local}
                                </p>
                                <p>
                                    <b>Tipo do torneio: </b>
                                    {EnumModifyTypeTournament(tournament.type_tournament ?? '')}
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
                                <h2>{tournament.name}</h2>
                            ))}
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                            {dataUsers.map((user) => (
                                <h2>{user.name}</h2>
                            ))}
                        </div>
                    </Content>
                </Layout>
            </>
        );
};
