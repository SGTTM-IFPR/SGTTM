import { Component, ReactNode } from 'react'
// import './App.css'
import { ConfigProvider, theme } from 'antd'
import { AutenticacaoFornecedor } from './autenticacao/contexto/AutenticacaoFornecedor'
import { AppRota } from './rotas/AppRota'

class App extends Component {
  render(): ReactNode {
    return (
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm 
        }}
      >
        <AutenticacaoFornecedor>
            <AppRota/>
        </AutenticacaoFornecedor>
      </ConfigProvider>
    );
  }
}

export default App
  