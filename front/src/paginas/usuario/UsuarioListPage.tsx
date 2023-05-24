import { Content, Header } from "antd/es/layout/layout";
import { Button, Layout, Table, Modal, Form, Space, message } from "antd";
import { UsuarioData } from "../../datas/UsuarioData";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { deleteUser, getAllUsers, getUserById } from "../../servicos/UsuarioServico";
import { ModificarEnumSexoUsuario } from "../../componentes/usuario/ModificarEnumSexoUsuario";
import { BotaoCriarUsuario } from "../../componentes/usuario/BotaoCriarUsuario";
import { BotaoEditarUsuario } from "../../componentes/usuario/BotaoEditarUsuario";
import { AuthService } from "../../servicos/AutenticarTokenServico";
import moment from "moment";


export const UsuarioListPage = () => {
  const [data, setData] = useState<UsuarioData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  AuthService.authToken();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const getResults = async () => {
    await getAllUsers().then((userData) => setData(userData));
  };

  useEffect(() => {
    const fetchData = async () => {
      getResults();
    };
    fetchData();
  }, []);

  const handleOk = async (id?: number) => {
    try {
      if (id) {
        const deletedUser = await deleteUser(id);
        console.log(deletedUser);
        setIsModalOpen(false);
        message.success("Usuário excluído com sucesso!");
      }
    } catch (error) {
      message.error("Erro ao excluir usuário!");
      setIsModalOpen(false);
    }
    getResults();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
        <h1 style={{ marginRight: "auto" }}>Lista de Usuários</h1>
        <BotaoCriarUsuario setData={setData} local="lista_usuario" />
      </Header>
      <Content>
        <Table dataSource={data} size="small">
          {/* <Column align="center" title="ID" dataIndex="id" key="id" /> */}
          <Column align="center" title="CPF" dataIndex="cpf" key="cpf" />
          <Column align="center" title="Nome" dataIndex="nome" key="nome" />
          <Column align="center" title="E-mail" dataIndex="email" key="email" />
          <Column
            align="center"
            title="Data de Nascimento"
            dataIndex="data_de_nascimento"
            key="data_de_nascimento"
            render={(text) => moment(text).format('DD/MM/YYYY')}
          />
          <Column
            align="center"
            title="Administrador"
            dataIndex="administrador"
            key="administrador"
            render={(text, record) => <span>{text ? "Sim" : "Não"}</span>}
          />
          <Column
            align="center"
            title="Atleta"
            dataIndex="atleta"
            key="atleta"
            render={(text, record) => <span>{text ? "Sim" : "Não"}</span>}
          />
          <Column align="center" title="Clube" dataIndex="clube" key="clube" />
          <Column align="center" title="Federação" dataIndex="federacao" key="federacao" />
          <Column align="center" title="Sexo" dataIndex="sexo" key="sexo" />
          <Column
            align="center"
            title="Ações"
            render={(record: UsuarioData) => (
              <Space size="middle">
                <BotaoEditarUsuario setData={setData} userUpdate={record} />
                <Button
                  size="small"
                  type="primary"
                  onClick={showModal}
                  danger
                >
                  Excluir
                </Button>
                <Modal title="Confirmação de Exclusão" open={isModalOpen} onOk={() => handleOk(record.id)} onCancel={handleCancel} cancelText="Cancelar" okText="Excluir">
                  <p>Deseja realmente excluir o Usuário?</p>
                </Modal>
              </Space>
            )}
          />
        </Table>
      </Content>
    </Layout>
  );
};
