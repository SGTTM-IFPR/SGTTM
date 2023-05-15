import { Alert, Button, Input, Space, Tooltip, Form } from 'antd';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { InfoCircleOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons';
import { AutheticationContext } from '../../autenticacao/context/AuthenticationContext';
import { BotaoRecuperarSenha } from '../../componentes/login/BotaoRecuperarSenha';
import { BotaoCriarUsuario } from '../../componentes/usuario/BotaoCriarUsuario';
import { UsuarioData } from '../../datas/UsuarioData';

export const LoginComponente = () => {

    const { login } = useContext(AutheticationContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [data, setData] = useState<UsuarioData[]>([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!username || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        const isLogginSucess = await login(username, password);
        if (!isLogginSucess) {
            setError('Usuário ou senha incorretos.');
            return;
        }
    };

    return (
        <div>
            {error && <Alert message={error} type="error" style={{ marginBottom: "10px" }} />}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">E-mail</label><br></br>
                    {/* <Input
                        value={username} onChange={event => setUsername(event.target.value)}
                        style={{ marginTop: '10px' }}
                        placeholder="Insira seu E-mail"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        suffix={
                            <Tooltip title="Campo destinado para inserção do E-mail do usuário">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                    /> */}
                    <Form>
                        <Form.Item name={['user', 'email']} rules={[{ required: true, message: "Campo obrigatório" }, { type: "email", message: "Preencha com um e-mail válido" }]}>
                            <Input style={{ marginTop: '10px' }} prefix={<UserOutlined className="site-form-item-icon" />} placeholder='Insira seu E-mail' value={username} onChange={event => setUsername(event.target.value)} suffix={
                                <Tooltip title="Campo destinado para inserção do E-mail do usuário">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            } />
                        </Form.Item>
                    </Form>
                </div>

                <div>
                    <br></br>
                    <label htmlFor="password">Senha</label><br></br>
                    <Input.Password
                        value={password} onChange={event => setPassword(event.target.value)}
                        style={{ marginTop: '10px' }}
                        prefix={<KeyOutlined className="site-form-item-icon" />}
                        placeholder="Insira sua senha"
                        visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                    />
                </div>
                <br></br>
                <div>
                    <Button style={{ marginTop: '20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.8em', cursor: 'pointer' }} type="primary" htmlType='submit'>
                        Login</Button>
                    <BotaoRecuperarSenha />
                    <div style={{ marginTop: "10px" }}>
                        <BotaoCriarUsuario setData={setData} />
                    </div>
                </div>
            </form >
        </div >
    );
};