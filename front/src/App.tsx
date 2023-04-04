import { Component, ReactNode, useState } from 'react'
import reactLogo from './assets/react.svg'
import { Route, Link, BrowserRouter as Router, Routes } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import { UserCrudPage } from  './pages/user_crud.page'
import { HomePage } from './pages/home.page'

class App extends Component {
  render(): ReactNode {
    return (
      <Router>
        <div>
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
        </div>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/user/" element={<UserCrudPage />} />
        </Routes>
       </Router> 

    )
  }
}

export default App
