import { Component, ReactNode, useState } from 'react'
import { Route, Link, BrowserRouter as Router, Routes } from 'react-router-dom'
// import './App.css'
import { UserCrudPage } from './pages/user/user_crud.page'
import { Login } from './pages/login/login'
import { ConfigProvider, Layout, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { AppSidebar } from './pages/AppSidebar'
import { MainContent } from './pages/MainContent'

class App extends Component {
  render(): ReactNode {
    return (
      <ConfigProvider
        theme={{
          token: {

          },
        }}
      >
        <Router>
          <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <MainContent/>
        </Router>
      </ConfigProvider>
    );
  }
}

export default App
  