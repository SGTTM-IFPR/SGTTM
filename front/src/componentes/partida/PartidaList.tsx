import { Button, Card, Col, Form, FormInstance, InputNumber, Layout, List, Row, Space } from "antd";
import { PartidaData } from "../../datas/PartidaData";
import { Content, Header } from "antd/es/layout/layout";
import { useAuth } from "../../autenticacao/context/AuthenticationContext";
import { useEffect, useState } from "react";


export interface IPartidaListProps {
    partidas?: PartidaData[] | null;
    form: FormInstance<any>;

}

export const PartidaList = (props: IPartidaListProps) => {
    const [partidas, setPartidas] = useState<PartidaData[] | null>(null);

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
        return (
            <div>Sem partidas</div>
        )

    return (
            <div>
                <List
                    dataSource={partidas}
                    renderItem={(partida: PartidaData) => (
                        <Row gutter={[12, 12]}  key={partida.id}>
                            <Col style={{ textAlign: 'center' }} span={24}>
                                <span>
                                    <strong>id:</strong> {partida.id}
                                    <strong>data de inicio:</strong> {partida.data_partida?.toString()}
                                </span>
                            </Col>
                            <Col style={{ textAlign: 'center' }} span={24}>
                                <Space wrap>
                                    <Form.Item>
                                        {partida.inscricao_atleta1.usuario?.nome?.toUpperCase()}
                                    </Form.Item>
                                    <Form.Item
                                        name={['partidas', partida.id, 'pontos_atleta_1']}
                                        initialValue={partida.pontos_atleta_1}
                                        style={{ padding: '' }}
                                    >
                                        <InputNumber style={{ padding: '5px', margin: '10px' }} min={0} max={12} size="small" disabled={!identity.isAdmin} />

                                    </Form.Item>
                                    <Form.Item>
                                        <div>x</div>
                                    </Form.Item>
                                    <Form.Item
                                        name={['partidas', partida.id, 'pontos_atleta_2']}
                                        initialValue={partida.pontos_atleta_2}
                                    >
                                        <InputNumber style={{ padding: '5px', margin: '10px' }} min={0} max={12} size="small" disabled={!identity.isAdmin} />
                                    </Form.Item>
                                    <Form.Item>
                                    {partida.inscricao_atleta2.usuario?.nome?.toUpperCase()}
                                    </Form.Item>
                                </Space>
                            </Col>
                        </Row>
                    )}
                />
            </div>
    );
};