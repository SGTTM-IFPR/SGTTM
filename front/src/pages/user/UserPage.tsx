import { Content, Header } from "antd/es/layout/layout";
import { Button, Layout, Table } from "antd";
import { UserData } from "../../datas/UserData";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { deleteUser, getAllUsers, getUserById } from "../../services/user.service";
import { ButtonCreateUser } from "../../components/ButtonCreateUser";
import { ButtonUpdateUser } from "../../components/ButtonUpdateUser";


export const UserPage = () => {
  const [data, setData] = useState<UserData[]>([]);

  const getResults = async () => {
    await getAllUsers().then((userData) => setData(userData));
  };

  useEffect(() => {
    const fetchData = async () => {
      getResults();
    };
    fetchData();
  }, []);

  const handleDelete = async (id?: number) => {
    if (id) {
      const deletedUser = await deleteUser(id);
      console.log(deletedUser);
      getResults();
    }
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
        <h1 style={{ margin: 0 }}>User list</h1>
        <ButtonCreateUser setData={setData}/>
      </Header>
      <Content>
        <Table dataSource={data} size="small">
          <Column align="center" title="Id" dataIndex="id" key="id" />
          <Column align="center" title="CPF" dataIndex="cpf" key="cpf" />
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column
            align="center"
            title="Birth Date"
            dataIndex="birth_date"
            key="birth_date"
          />
          <Column
            align="center"
            title="Administrator"
            dataIndex="administrator"
            key="administrator"
            render={(text, record) => <span>{text ? "Yes" : "No"}</span>}
          />
          <Column
            align="center"
            title="Athlete"
            dataIndex="athlete"
            key="athlete"
            render={(text, record) => <span>{text ? "Yes" : "No"}</span>}
          />
          <Column title="Club" dataIndex="club" key="club" />
          <Column title="Federation" dataIndex="federation" key="federation" />
          <Column title="Sex" dataIndex="sex" key="sex" />
          <Column
            align="center"
            title="Actions"
            render={(record: UserData) => (
              <>
                <ButtonUpdateUser setData={setData} userUpdate={record}/>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => handleDelete(record.id)}
                  danger
                >
                  Delete
                </Button>
              </>
            )}
          />
        </Table>
      </Content>
    </Layout>
  );
};
