import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

export const AppSidebar = () => {
  return (
    <Sider width={300}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" >
        <Menu.Item key="1">
          <Link to="/home">
            <span>Página Inicial</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/user">
            <span>Gerenciamento de Usuários</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/tournament">
            <span>Gerenciamento de Torneios</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
