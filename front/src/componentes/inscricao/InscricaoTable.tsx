import { InscricaoData } from "../../datas/InscricaoData";
import { Table, Row, Col } from 'antd'
import Column from "antd/es/table/Column";
import { UsuarioData } from "../../datas/UsuarioData";

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
        { title: 'Numero de inscrição', dataIndex: 'id', key: 'id'},
        { title: 'Nome', dataIndex: 'usuario', key: 'usuario', render: renderNome },
    ]; 

    return (
        <Table dataSource={inscricoes} columns={columns} rowKey="id" >
        </Table>
    )
} 