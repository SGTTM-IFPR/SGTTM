import { InscricaoData } from "../../datas/InscricaoData";
import { Table, Row, Col } from 'antd'
import Column from "antd/es/table/Column";
import { UsuarioData } from "../../datas/UsuarioData";
import { BotaoExcluirInscricao } from "./BotaoExcluirInscricao";
import { AlignType } from 'rc-table/lib/interface'
import { useEffect } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface IInscricaoPointsTableProps {
    inscricoes?: InscricaoData[] | null;
}
export const InscricaoPointsTable = ({ inscricoes }: IInscricaoPointsTableProps) => {

    useEffect(() => {
        if(!inscricoes)
         return;
         inscricoes.forEach(inscricao => {
             if(inscricao?.vitorias ?? 0 > 0)
                console.log(inscricao)
         })
    }, [inscricoes])

    if (!inscricoes || inscricoes.length === 0)
        return (
            <div>Nenhum inscrito</div>
        )

    const renderNome = (usuario: UsuarioData) => {
        return usuario ? usuario.nome : '-';
    }

    const columns = [
        { title: 'Numero de inscrição', dataIndex: 'id', key: 'id', align: 'center' as AlignType },
        { title: 'Nome', dataIndex: 'usuario', key: 'usuario', render: renderNome },
        { title: 'Condição', dataIndex: 'condicao', key: 'condicao' },
        { title: 'jogadas', dataIndex: 'partidas_jogadas', key: 'partidas_jogadas', align: 'center' as AlignType },
        { title:  (
            <span style={{ color: "green" }}>
              <CheckCircleOutlined /> Vitorias
            </span>
          ), dataIndex: 'vitorias', align: 'center' as AlignType},
        { title: (
            <span style={{ color: "red" }}>
              <CloseCircleOutlined /> Derrotas
            </span>
          ), dataIndex: 'derrotas', align: 'center' as AlignType},
    ];

    return (
        <Table
            dataSource={inscricoes}
            columns={columns}
            rowKey="id"
            pagination={false}>
        </Table>
    )
} 