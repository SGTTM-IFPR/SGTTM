import { Button, Card, Col, Form, FormInstance, InputNumber, Layout, List, Row, Space } from "antd";
import { PartidaData } from "../../datas/PartidaData";
import { Content, Header } from "antd/es/layout/layout";
import { useAuth } from "../../autenticacao/context/AuthenticationContext";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useTorneioContext } from "../../paginas/torneio/context/TorneioContext";
import moment from 'moment';

export interface IPartidaListProps {
    partidas?: PartidaData[] | null;
    form: FormInstance<any>;
}

export const PartidaList = (props: IPartidaListProps) => {
    const [partidas, setPartidas] = useState<PartidaData[] | null>(null);
    const { torneio } = useTorneioContext();

    const { identity } = useAuth();

    const { form } = props;

    useEffect(() => {
        if (props.partidas) {
            setPartidas(props.partidas);
            const formValues = props.partidas.reduce((values: any, partida: PartidaData) => {
                values[`partidas.${partida.id}.pontos_atleta_1`] = partida.pontos_atleta_1 ?? 0;
                values[`partidas.${partida.id}.pontos_atleta_2`] = partida.pontos_atleta_2 ?? 0;
                return values;
            }, {});
            form.setFieldsValue(formValues);
        }
    }, [props.partidas]);

    if (!partidas)
        return <div>Sem partidas</div>;

    return (
        <div>
            <List
                dataSource={partidas}
                renderItem={(partida: PartidaData) => (
                    <Row gutter={[12, 12]} key={partida.id}>
                        <Col style={{ textAlign: 'center' }} span={24}>
                            {/* <Card> */}
                            <Space wrap>
                                <div style={{ paddingTop: "15px" }}>
                                    <strong>ID:</strong> {partida.id}
                                    <span> | </span>
                                    <strong>Data de Início:</strong> {moment(partida.data_partida).format('DD/MM/YYYY')}
                                </div>
                            </Space>
                            {/* </Card> */}
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={24}>
                            <Card>
                                <Space wrap>
                                    <Form.Item>
                                        <UserOutlined style={{ marginRight: "10px" }} />
                                        {partida.inscricao_atleta1?.usuario?.nome?.toUpperCase()}
                                    </Form.Item>
                                    <Form.Item
                                        name={['partidas', partida.id, 'pontos_atleta_1']}
                                        initialValue={partida.pontos_atleta_1}
                                        style={{ padding: '' }}
                                    >
                                        <InputNumber
                                            style={{ padding: '5px', margin: '10px' }}
                                            min={0}
                                            max={4}
                                            size="small"
                                            disabled={!identity.isAdmin || torneio?.fase_atual != 'Fase de grupos'}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <div>x</div>
                                    </Form.Item>
                                    <Form.Item
                                        name={['partidas', partida.id, 'pontos_atleta_2']}
                                        initialValue={partida.pontos_atleta_2}
                                    >
                                        <InputNumber
                                            style={{ padding: '5px', margin: '10px' }}
                                            min={0}
                                            max={4}
                                            size="small"
                                            disabled={!identity.isAdmin || torneio?.fase_atual != 'Fase de grupos'}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        {partida.inscricao_atleta2?.usuario?.nome?.toUpperCase()}
                                        <UserOutlined style={{ marginLeft: "10px" }} />
                                    </Form.Item>
                                </Space>
                            </Card>
                        </Col>
                        {/* <Col>
                                    {partida.pontos_atleta_1}
                                    {partida.pontos_atleta_2}
                        </Col> */}
                    </Row>
                )}
            />
        </div>
    );
};
