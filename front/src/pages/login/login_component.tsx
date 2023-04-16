import { Alert, Button, Input, Space, Tooltip } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import { InfoCircleOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons';

export const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!username || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        setError('')
        try {
            const response = await axios.post('http://127.0.0.1:5000/auth/login', {
                username,
                password
            });
            if (response.status === 200) {
                setError(JSON.stringify(response.data, null, 2))

            }
        } catch (error) {
            setError('Usuário ou senha inválidos.');
        }
        console.log(`Nome de usuário: ${username}, Senha: ${password}`);
    };

    return (
        <div>
            {error && <Alert message={error} type="error" style={{ marginBottom: "10px" }} />}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">CPF ou E-mail</label><br></br>
                    <Input
                        value={username} onChange={event => setUsername(event.target.value)}
                        style={{ marginTop: '10px' }}
                        placeholder="Insira seu CPF ou E-mail"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        suffix={
                            <Tooltip title="Campo destinado para inserção do CPF ou E-mail do usuário">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                    />
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
                    <Button style={{ marginTop: '20px', backgroundColor: 'rgb(3, 194, 3)', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.8em', cursor: 'pointer' }} type="primary" htmlType='submit'>
                        Login</Button>
                    <Button style={{ marginLeft: '20px', backgroundColor: '#e2e0e0', color: '#8f8e8e', border: 'none', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.8em', cursor: 'pointer' }} type="primary">Esqueci minha senha</Button>
                </div>
            </form >
        </div >
    );
};