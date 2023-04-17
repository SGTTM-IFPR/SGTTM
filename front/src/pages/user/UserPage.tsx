import { Content, Header } from "antd/es/layout/layout";
import { Button, Layout, Table, Modal} from "antd";
import { UserData } from "../../datas/UserData";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { deleteUser, getAllUsers, getUserById } from "../../services/user.service";
import { ButtonCreateUser } from "../../components/user/ButtonCreateUser";
import { ButtonUpdateUser } from "../../components/user/ButtonUpdateUser";


export const UserPage = () => {
  const [data, setData] = useState<UserData[]>([]);
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
        <ButtonCreateUser setData={setData} />
      </Header>
      <Content>
        <Table dataSource={data} size="small">
          <Column align="center" title="ID" dataIndex="id" key="id" />
          <Column align="center" title="CPF" dataIndex="cpf" key="cpf" />
          <Column title="Nome" dataIndex="name" key="name" />
          <Column title="E-mail" dataIndex="email" key="email" />
          <Column
            align="center"
            title="Data de Nascimento"
            dataIndex="birth_date"
            key="birth_date"
          />
          <Column
            align="center"
            title="Administrador"
            dataIndex="administrator"
            key="administrator"
            render={(text, record) => <span>{text ? "Yes" : "No"}</span>}
          />
          <Column
            align="center"
            title="Atleta"
            dataIndex="athlete"
            key="athlete"
            render={(text, record) => <span>{text ? "Yes" : "No"}</span>}
          />
          <Column title="Clube" dataIndex="club" key="club" />
          <Column title="Federação" dataIndex="federation" key="federation" />
          <Column title="Sexo" dataIndex="sex" key="sex" />
          <Column
            align="center"
            title="Ações"
            render={(record: UserData) => (
              <>
                <ButtonUpdateUser setData={setData} userUpdate={record} />
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
