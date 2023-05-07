import { Content, Header } from "antd/es/layout/layout";
import { Button, Layout, Table, Modal, Form } from "antd";
import { UsuarioData } from "../../datas/UsuarioData";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { deleteUser, getAllUsers, getUserById } from "../../servicos/UsuarioServico";
import { ModificarEnumSexoUsuario } from "../../componentes/usuario/ModificarEnumSexoUsuario";
import { BotaoCriarUsuario } from "../../componentes/usuario/BotaoCriarUsuario";
import { BotaoEditarUsuario } from "../../componentes/usuario/BotaoEditarUsuario";


export const UsuarioListPage = () => {
  const [data, setData] = useState<UsuarioData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (id) {
      const deletedUser = await deleteUser(id);
      console.log(deletedUser);
      getResults();
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = (id?: number): void => {
    console.log(id);
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
        <h1 style={{ margin: 0 }}>Lista de Usuários</h1>
        <BotaoCriarUsuario setData={setData} />
      </Header>
      <Content>
        <Table dataSource={data} size="small">
          <Column align="center" title="ID" dataIndex="id" key="id" />
          <Column align="center" title="CPF" dataIndex="cpf" key="cpf" />
          <Column title="Nome" dataIndex="nome" key="nome" />
          <Column title="E-mail" dataIndex="email" key="email" />
          <Column
            align="center"
            title="Data de Nascimento"
            dataIndex="data_de_nascimento"
            key="data_de_nascimento"
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
          <Column title="Clube" dataIndex="clube" key="clube" />
          <Column title="Federação" dataIndex="federacao" key="federacao" />
          <Column title="Sexo" dataIndex="sexo" key="sexo" />
          <Column
            align="center"
            title="Ações"
            render={(record: UsuarioData) => (
              <>
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
              </>
            )}
          />
        </Table>
      </Content>
    </Layout>
  );
};
