import { InscricaoData } from "../../datas/InscricaoData";
import { Table, Row, Col } from 'antd'
import Column from "antd/es/table/Column";
import { UsuarioData } from "../../datas/UsuarioData";
import { BotaoExcluirInscricao } from "./BotaoExcluirInscricao";
import { AlignType } from 'rc-table/lib/interface'
import { useEffect } from "react";


interface IInscricaoPointsTableProps {
    inscricoes?: InscricaoData[] | null;
}
export const InscricaoPointsTable = ({ inscricoes }: IInscricaoPointsTableProps) => {

    useEffect(() => {
        if(!inscricoes)
         return;
         inscricoes.forEach(inscricao => {
            inscricao.vitorias = 0;
            inscricao.derrotas = 0;
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
        { title: 'Vitorias', dataIndex: 'vitorias', align: 'center' as AlignType},
        { title: 'Derrotas', dataIndex: 'derrotas', align: 'center' as AlignType},
    ];

    return (
        <Table dataSource={inscricoes} columns={columns} rowKey="id" pagination={false} >
        </Table>
    )
} 