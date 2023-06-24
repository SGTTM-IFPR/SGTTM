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
                <Table dataSource={data} size="small" locale={{ emptyText: 'Não há dados' }}>

                    {/* <Column align="center" title="ID" dataIndex="id" key="id" /> */}

                    <Column key="nome" align="center" title="Nome" dataIndex="nome" />

                    <Column
                        key="data_inicio"
                        align="center"
                        title="Data de início"
                        dataIndex="data_inicio"
                        render={(text) => moment(text).format('DD/MM/YYYY')}
                    />

                    <Column
                        key="data_final"
                        align="center"
                        title="Data de término"
                        dataIndex="data_final"
                        render={(text) => moment(text).format('DD/MM/YYYY')}
                    />

                    <Column key="local" align="center" title="Local" dataIndex="local" />

                    <Column key="tipo_torneio" align="center" title="Tipo do torneio" dataIndex="tipo_torneio" />

                    <Column key="fase_atual" align="center" title="Fase atual" dataIndex="fase_atual" />

                    <Column key="status" align="center" title="Status" dataIndex="status" />

                    <Column
                        key="acoes"
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
