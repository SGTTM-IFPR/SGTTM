import { Content, Header } from "antd/es/layout/layout";
import { Button, Layout, Table, Modal } from "antd";
import { TournamentData } from "../../datas/TournamentData";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { deleteTournament, getAllTournaments, getTournamentById } from "../../services/tournament.service";

import { ButtonCreateTournament } from "../../components/tournament/ButtonCreateTournament";
import { ButtonUpdateTournament } from "../../components/tournament/ButtonUpdateTournament";

export const TournamentPage = () => {
    const [data, setData] = useState<TournamentData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (id?: number) => {
        if (id) {
            const deletedTournament = await deleteTournament(id);
            console.log(deletedTournament);
            getResults();
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getResults = async () => {
        await getAllTournaments().then((TournamentData) => setData(TournamentData));
    };

    useEffect(() => {
        const fetchData = async () => {
            getResults();
        };
        fetchData();
    }, []);

    const handleUpdate = (id?: number): void => {
        console.log(id);
    };

    return (
        <Layout>
            <Header
                style={{
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "20px",
                }}
            >
                <h1 style={{ margin: 0 }}>Lista de Torneios</h1>
                <ButtonCreateTournament setData={setData} />
            </Header>
            <Content>
                <Table dataSource={data} size="small">
                    <Column align="center" title="ID" dataIndex="id" key="id" />

                    <Column title="Nome" dataIndex="name" key="name" />

                    <Column
                        align="center"
                        title="Data de início"
                        dataIndex="date_start"
                        key="date_start"
                    />

                    <Column
                        align="center"
                        title="Data de término"
                        dataIndex="date_end"
                        key="date_end"
                    />

                    <Column title="Local" dataIndex="local" key="local" />

                    <Column title="Tipo do torneio" dataIndex="type_tournament" key="type_tournament" />

                    <Column
                        align="center"
                        title="Ações"
                        render={(record: TournamentData) => (
                            <>
                                <ButtonUpdateTournament setData={setData} tournamentUpdate={record} />
                                <Button
                                    size="small"
                                    type="primary"
                                    onClick={showModal}
                                    danger
                                >
                                    Excluir
                                </Button>
                                <Modal title="Confirmação de Exclusão" open={isModalOpen} onOk={() => handleOk(record.id)} onCancel={handleCancel} cancelText="Cancelar" okText="Excluir">
                                    <p>Deseja realmente excluir o Torneio?</p>
                                </Modal>
                            </>
                        )}
                    />
                </Table>
            </Content>
        </Layout>
    );
};
