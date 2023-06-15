import { Card, Col, Divider, Form, InputNumber, Modal, Row, Space, Spin } from "antd";
import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import { getAllPartidasByTorneioId } from "../../servicos/PartidaService";
import { useEffect, useState } from "react";
import { useWindowSize } from 'usehooks-ts';
import { useTorneioContext } from "../../paginas/torneio/context/TorneioContext";
import { UserOutlined } from "@ant-design/icons";
import { Match as MatchData, Participant } from "../../datas/MatchData"

function montar_partida(partidas: any[]) {
    const matches = [];

    for (let i = 0; i < partidas.length; i++) {
        const partida = partidas[i];

        if (partida.etapa.toUpperCase() !== "PRIMEIRA FASE") {
            const match = {
                "id": partida.id,
                "name": partida.etapa.toUpperCase(),
                "nextMatchId": partida.id_proxima_partida ?? null,
                "tournamentRoundText": partida.etapa,
                "startTime": "09/06/2023",
                "state": "DONE",
                "participants": [
                    {
                        "id": partida.inscricao_atleta1?.id ?? 0,
                        "resultText": partida.pontos_atleta_1.toString(),
                        "isWinner": partida.pontos_atleta_1 > partida.pontos_atleta_2,
                        "status": null,
                        "name": partida.inscricao_atleta1?.usuario.nome ?? "A Definir"
                    },
                    {
                        "id": partida.inscricao_atleta2?.id ?? 0,
                        "resultText": partida.pontos_atleta_2.toString(),
                        "isWinner": partida.pontos_atleta_2 > partida.pontos_atleta_1,
                        "status": null,
                        "name": partida.inscricao_atleta2?.usuario.nome ?? "A Definir"
                    }
                ]
            };
            matches.push(match);
        }
    }
    console.log("matches", matches);
    return matches;
}

interface IFaseEliminatoriaProps { }

export const FaseEliminatoria = ({ }: IFaseEliminatoriaProps) => {
    const [match_todas, setMatch_todas] = useState<any[]>([]);
    const { torneio, fetchTorneio } = useTorneioContext();
    const { width, height } = useWindowSize();
    const [modalOpen, setModalOpen] = useState<boolean>();
    const [partidaSelected, setPartidaSelected] = useState<MatchData>()

    useEffect(() => {
        const fetchPartidas = async () => {
            if (!torneio?.id) return;
            await getAllPartidasByTorneioId(torneio?.id).then((partidaData) => {
                setMatch_todas(montar_partida(partidaData));
            });
        };
        fetchPartidas();
    }, [torneio?.id]);


    const clickMatch = (event: any) => {
        console.log(event.match)
        setPartidaSelected(event.match);
        setModalOpen(true);
    }

    const closeModal = (event: any) => {
        setModalOpen(false);
    }

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "20px",
                    margin: "20px 20px",
                }}
            >

                {match_todas.length > 0 ? (
                    <SingleEliminationBracket
                        options={{
                            style: {
                                spaceBetweenRows: -10,
                                spaceBetweenColumns: 50,
                                width: 250,
                                // usar connectorColor: "#fff" como segunda opcao
                                // connectorColor: "#fff",
                            }
                        }}
                        matches={match_todas}
                        matchComponent={Match}
                        svgWrapper={({
                            children,
                            ...props
                        }) => (
                            // console.log("props", props),
                            // background={'#0b0d12'} SVGBackground={'#0b0d12'} para mudar cor de fundo
                            <SVGViewer width={width} height={height} {...props}>
                                {children}
                            </SVGViewer>

                        )}
                        onMatchClick={clickMatch}
                    />
                ) : (
                    <Spin size="large" />
                )}
            </div >
            <Modal open={modalOpen} onCancel={closeModal} width={700}>
                <div style={{ width: '100%' }}>
                    {partidaSelected &&
                        <Row>
                            <Col style={{ textAlign: 'center' }} span={24}>
                                <Space wrap>
                                    <Form.Item>
                                        <UserOutlined style={{ marginRight: "10px" }} />
                                        {partidaSelected.participants[0].name?.toUpperCase()}
                                    </Form.Item>
                                    <Form.Item
                                        name={['partidas', partidaSelected.id, 'pontos_atleta_1']}
                                        initialValue={partidaSelected.participants[0].resultText}
                                        style={{ padding: '' }}
                                    >
                                        <InputNumber
                                            style={{ padding: '5px', margin: '10px' }}
                                            min={0}
                                            max={4}
                                            size="small"
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <div>x</div>
                                    </Form.Item>
                                    <Form.Item
                                        name={['partidas', partidaSelected.id, 'pontos_atleta_2']}
                                        initialValue={partidaSelected.participants[1].resultText}
                                    >
                                        <InputNumber
                                            style={{ padding: '5px', margin: '10px' }}
                                            min={0}
                                            max={4}
                                            size="small"
                                        // disabled={!identity.isAdmin || torneio?.fase_atual != 'Fase de grupos'}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        {partidaSelected.participants[1].name?.toUpperCase()}
                                        <UserOutlined style={{ marginLeft: "10px" }} />
                                    </Form.Item>
                                </Space>
                            </Col>
                        </Row>
                    }
                </div>
            </Modal>
        </>
    );
};
