import { InscricaoData } from "../../datas/InscricaoData";
import { Table, Row, Col } from 'antd'
import Column from "antd/es/table/Column";
import { UsuarioData } from "../../datas/UsuarioData";
import { BotaoExcluirInscricao } from "./BotaoExcluirInscricao";
import { useContext, useEffect, useState } from "react";
import { AutheticationContext, useAuth } from "../../autenticacao/context/AuthenticationContext";
import { useTorneioContext } from "../../paginas/torneio/context/TorneioContext";


interface IInscricaoTableProps {
}
export const InscricaoTable = ({ }: IInscricaoTableProps) => {
    const { identity } = useAuth();
    const { inscricoes } = useTorneioContext();
    const { torneio } = useTorneioContext();
    const [canDelete, setCanDelete] = useState(true);

    useEffect(() => {  
        if(torneio?.status === 'Em andamento')
            setCanDelete(false);
    }, [torneio]);

    useAuth
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
        ...(identity.isAdmin && canDelete ? [
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