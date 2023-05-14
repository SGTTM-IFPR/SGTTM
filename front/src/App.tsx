import { Component, ReactNode } from 'react'
// import './App.css'
import { ConfigProvider, theme } from 'antd'
import { AuthenticationProvider } from './autenticacao/context/AuthenticationProvider'
import { AppRoute } from './rotas/AppRoute'

class App extends Component {
  render(): ReactNode {
    return (
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm 
        }}
      >
            <AppRoute/>
      </ConfigProvider>
    );
  }
}

export default App
  