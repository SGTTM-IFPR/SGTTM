import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  HomeFilled,
  PieChartOutlined,
  TeamOutlined,
  TableOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;
import type { MenuProps } from 'antd';

export const AppSidebar = () => {

  type MenuItem = Required<MenuProps>['items'][number];


  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    disabled?: boolean,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      disabled,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Pagina Inicial', '1',  <Link to="home"><HomeFilled/></Link>),
    getItem('Usuários', '2',<Link to="user"><TeamOutlined /></Link> ),
    getItem('Torneios', '3', <Link to="tournament"><PieChartOutlined /></Link>),
    getItem('Ranking', '4', <TableOutlined />, true),
  ];
  //adicionar rank depois

  return (
    <Sider width={200} collapsible>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
  );
};
