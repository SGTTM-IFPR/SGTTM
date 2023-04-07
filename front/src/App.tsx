import { Component, ReactNode, useState } from 'react'
import { Route, Link, BrowserRouter as Router, Routes } from 'react-router-dom'
// import './App.css'
import { UserCrudPage } from './pages/user_crud.page'
import { HomePage } from './pages/home.page'
import { Login } from './pages/login/login'

class App extends Component {
  render(): ReactNode {
    return (
      <Router>
        {/* <div>
          <Link to="/">
            <button >
              Página Inicial
            </button>
          </Link>
          <Link to="/user/">
            <button >
              Gerenciamento de Usuários
            </button>
          </Link>
        </div> */}
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/user" element={<UserCrudPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    )
  }
}

export default App
