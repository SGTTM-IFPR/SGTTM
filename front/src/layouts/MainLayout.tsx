import { Button, Col, Layout, Popconfirm, Row } from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
import { AppSidebar } from "../pages/AppSidebar";
import { Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../authentication/context/AuthContext";
import { LogoutOutlined } from "@ant-design/icons";
import axios from "axios"; // Importar a biblioteca Axios para fazer chamadas HTTP

export const MainLayout = () => {
  const { logout } = useContext(AuthContext);

  // Função para fazer logout, chamando a API em Flask
  const handleLogout = async () => {
    try {
      const response = await axios.post("/logout"); // Chama a rota /logout da API Flask
      if (response.status === 200) {
        logout(); // Executa a função logout da AuthContext em caso de sucesso
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppSidebar />
      <Layout>
        <Header
          style={{background: "#4fdf29",  position: 'sticky', top: 0, zIndex: 1, width: '100%', display:'flex', height: '50px', paddingInline: '10px' }}
        >
        <Row align="middle" justify="space-between"
            style={{
              fontSize: "11px",
              width: "100%",
              height: "100%", // Set the height of the Row to 100% to follow the Header's height
              lineHeight: "10px", // Vertically center the text
            }}>
        <Col>
          {/* <h2 style={{ color: "white", margin: 0 }}>Your Title</h2> */}
        </Col>
        <Col>
          {/* <Button size="small" style={{ marginRight: 10, fontSize: '11px' }}>
            Button 1
          </Button> */}
          <Popconfirm
                placement="rightTop"
                title={"Voce tem certeza que quer fazer logout?"}
                description={"Voce sera redirecionado para a pagina de login."}
                onConfirm={handleLogout} // Chama a função handleLogout em vez de logout
                okText="Sim"
                cancelText="Não"
              >
                <Button size="small" style={{ color: 'red', fontSize: '11px'}}>
                  Logout <LogoutOutlined />
                </Button>
              </Popconfirm>
        </Col>
      </Row>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <main style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <Outlet />
          </main>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          SGTTM ©2023 Created by Carlos, Rafhael and Nicolas
        </Footer>
      </Layout>
    </Layout>
  );
};
