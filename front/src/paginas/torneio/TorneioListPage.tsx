import { Content, Header } from "antd/es/layout/layout";
import { Button, Layout, Table, Modal, Space, message } from "antd";
import { TorneioData } from "../../datas/TorneioData";
import { InscricaoData } from "../../datas/InscricaoData";
import Column from "antd/es/table/Column";
import { SetStateAction, useEffect, useState } from "react";
import { deleteTournament, getAllTournaments } from "../../servicos/TorneioServico";
import { ModificarEnumTipoTorneio } from "../../componentes/torneio/ModificarEnumTipoTorneio"
import { BotaoCriarTorneio } from "../../componentes/torneio/BotaoCriarTorneio";
import { BotaoEditarTorneio } from "../../componentes/torneio/BotaoEditarTorneio";
import { BotaoCriarInscricao } from "../../componentes/inscricao/BotaoCriarInscricao";
import { BotaoCriarGrupo } from "../../componentes/grupo/BotaoCriarGrupo";
import { AuthService } from "../../servicos/AutenticarTokenServico";
import moment from "moment";

export const TorneioListPage = () => {
    const [data, setData] = useState<TorneioData[]>([]);
    const [dataInscricao, setDataInscricao] = useState<InscricaoData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    AuthService.authToken();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (id?: number) => {
        try {
            if (id) {
                const deletedTournament = await deleteTournament(id);
                console.log(deletedTournament);
                getResults();
            }
            setIsModalOpen(false);
            message.success('Torneio excluído com sucesso!');
        } catch (error) {
            message.error('Erro ao excluir torneio!');
            setIsModalOpen(false);
        }
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
                <h1 style={{ marginRight: "auto" }}>Lista de Torneios</h1>
                <BotaoCriarTorneio setData={setData} />
            </Header>
            <Content>
                <Table dataSource={data} size="small">
                    <Column align="center" title="ID" dataIndex="id" key="id" />

                    <Column title="Nome" dataIndex="nome" key="nome" />

                    <Column
                        align="center"
                        title="Data de início"
                        dataIndex="data_inicio"
                        key="data_inicio"
                        render={(text) => moment(text).format('DD/MM/YYYY')}
                    />

                    <Column
                        align="center"
                        title="Data de término"
                        dataIndex="data_final"
                        key="data_final"
                        render={(text) => moment(text).format('DD/MM/YYYY')}
                    />

                    <Column title="Local" dataIndex="local" key="local" />

                    <Column title="Tipo do torneio" dataIndex="tipo_torneio" key="tipo_torneio" />

                    <Column title="Status" dataIndex="status" key="status" />

                    <Column
                        align="center"
                        title="Ações"
                        render={(record: TorneioData) => (
                            <Space size="middle">
                                <BotaoEditarTorneio setData={setData} tournamentUpdate={record} />
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
                            </Space>
                        )}
                    />
                </Table>
            </Content>
        </Layout>
    );
};
