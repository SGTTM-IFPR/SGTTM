import { Card, Col, InputNumber, Layout, List, Row, Space } from "antd";
import { PartidaData } from "../../datas/PartidaData";
import { Content, Header } from "antd/es/layout/layout";
import { useAuth } from "../../autenticacao/context/AuthenticationContext";
import { useEffect, useState } from "react";


export interface IPartidaListProps {
    partidas?: PartidaData[] | null;

}


export const PartidaList = (props: IPartidaListProps) => {

    const [pontosAtleta1, setPontosAtleta1] = useState(0);
    const [pontosAtleta2, setPontosAtleta2] = useState(0);

    const { identity } = useAuth();
    const { partidas } = props;

    if (!partidas)
        return (
            <div>Sem partidas</div>
        )
    useEffect(() => {
        if (partidas) {
            console.log(identity)
            setPontosAtleta1(partidas[0]?.pontos_atleta_1);
            setPontosAtleta2(partidas[0]?.pontos_atleta_1);
        }
    }, [partidas])
    return (
        <div>
            <List dataSource={partidas}
                renderItem={(partida: PartidaData) => (


                    <List.Item key={partida.id}>
                        <Row gutter={[12, 12]}>
                            <Col style={{ textAlign: 'center' }} span={24}>
                                <span>
                                    <strong>data de inicio:</strong> {partida.data_partida?.toString()}
                                </span>
                            </Col>
                            <Col style={{ textAlign: 'center' }} span={24}>
                                <Space wrap>
                                    <span>{partida.inscricao_atleta1.usuario?.nome?.toUpperCase()}</span>
                                    <InputNumber value={pontosAtleta1} min={0}  size="small" disabled={!identity.isAdmin} />
                                    <div>x</div>
                                    <InputNumber value={pontosAtleta2} min={0} size="small" disabled={!identity.isAdmin}/>
                                    <span>{partida.inscricao_atleta2.usuario?.nome?.toUpperCase()}</span>
                                </Space>
                            </Col>
                        </Row>
                    </List.Item>

                )
                }
            />
        </div >
    )
}
