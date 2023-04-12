import { Layout } from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
import { Routes, Route } from "react-router";
import { AppSidebar } from "./AppSidebar";
import { HomePage } from "./home.page";
import { UserPage } from "./user/UserPage";

export const MainContent = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
        <AppSidebar />
        <Layout>
          <Header style={{ background: '#4fdf29', padding: 0, height:'40px' }} />
          <Content style={{ margin: "0 16px" }}>
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/user" element={<UserPage />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
          SGTTM ©2023 Created by Carlos, Rafael and Nicolas
          </Footer>
        </Layout>
      </Layout>
    )};