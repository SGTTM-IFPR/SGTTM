import { Component, ReactNode } from 'react'
// import './App.css'
import { ConfigProvider, theme } from 'antd'
import { AuthProvider } from './authentication/context/AuthProvider'
import { AppRouter } from './router/AppRouter'

class App extends Component {
  render(): ReactNode {
    return (
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm 
        }}
      >
        <AuthProvider>
            <AppRouter/>
        </AuthProvider>
      </ConfigProvider>
    );
  }
}

export default App
  