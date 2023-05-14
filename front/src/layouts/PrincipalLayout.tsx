import { Button, Col, Layout, Popconfirm, Row } from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
import { AppSidebar } from "../paginas/AppSidebar";
import { Outlet } from "react-router";
import { useContext } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { VerificarNomeUsuario } from "../componentes/autenticacao/VerificarNomeUsuario";
import { AutheticationContext } from "../autenticacao/context/AuthenticationContext";

export const MainLayout = () => {

  const { logout } = useContext(AutheticationContext);
  const { identity } = useContext(AutheticationContext);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppSidebar />
      <Layout>
        <Header
          style={{ background: "#4fdf29", position: 'sticky', top: 0, zIndex: 1, width: '100%', display: 'flex', height: '50px', paddingInline: '10px' }}
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
                title={"Deseja realmente sair?"}
                description={"Você será redirecionado para a página de login."}
                onConfirm={logout}
                okText="Sim"
                cancelText="Não"
              >
                <span style={{
                  marginRight: '10px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: 'white'
                }}>Bem Vindo, {identity.nome}!</span>
                <Button size="middle" style={{
                  backgroundColor: '#F5222D',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s ease-in-out',
                }}>
                  Sair <LogoutOutlined />
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
