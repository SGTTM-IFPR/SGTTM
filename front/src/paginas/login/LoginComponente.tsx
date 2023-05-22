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
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [data, setData] = useState<UsuarioData[]>([]);

    const handleSubmit = async (values: any) => {
        if (!values.username || !values.password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        const isLogginSucess = await login(values.username, values.password);
        if (!isLogginSucess) {
            setError('Usuário ou senha incorretos.');
            return;
        }
    };

    return (
        <div>
            {error && <Alert message={error} type="error" style={{ marginBottom: "10px" }} />}

            <Form onFinish={handleSubmit}>
                <Form.Item
                    name="username"
                    label="E-mail"
                    rules={[
                        { required: true, message: "Campo obrigatório" },
                        { type: "email", message: "Preencha com um e-mail válido" }
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Insira seu E-mail"
                        suffix={
                            <Tooltip title="Campo destinado para inserção do E-mail do usuário">
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                        style={{ marginTop: '10px' }}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Senha"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                    <Input.Password
                        prefix={<KeyOutlined className="site-form-item-icon" />}
                        placeholder="Insira sua senha"
                        visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                        style={{ marginTop: '10px' }}
                    />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginTop: '20px', backgroundColor: '#28a745', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '0.8em', cursor: 'pointer' }}
                >
                    Login
                </Button>
            </Form>
            <BotaoRecuperarSenha />
        </div>
    );
};
