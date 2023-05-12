import { InscricaoData } from "../../datas/InscricaoData";
import { Table, Row, Col } from 'antd'
import Column from "antd/es/table/Column";
import { UsuarioData } from "../../datas/UsuarioData";
import { BotaoExcluirInscricao } from "./BotaoExcluirInscricao";
import { VerificarUsuario } from "../autenticacao/VerificarUsuario";

const admin = VerificarUsuario();

interface IInscricaoTableProps {
    inscricoes?: InscricaoData[] | null;
}
export const InscricaoTable = ({ inscricoes }: IInscricaoTableProps) => {
    if (!inscricoes || inscricoes.length === 0)
        return (
            <div>Nenhum inscrito</div>
        )

    const renderNome = (usuario: UsuarioData) => {
        return usuario ? usuario.nome : '-';
    }

    const columns = [
        { title: 'Numero de inscrição', dataIndex: 'id', key: 'id' },
        { title: 'Nome', dataIndex: 'usuario', key: 'usuario', render: renderNome },
        { title: 'Condição', dataIndex: 'condicao', key: 'condicao' },
        // botao para excluir inscricao
        ...(admin ? [
            {
                title: 'Ações',
                render: (_: any, { id }: InscricaoData) => (
                    <Row>
                        <Col span={12}>
                            <BotaoExcluirInscricao idInscricao={id} />
                        </Col>
                    </Row>
                ),
            },
        ] : []),
    ];

    return (
        <Table dataSource={inscricoes} columns={columns} rowKey="id" >
        </Table>
    )
} 