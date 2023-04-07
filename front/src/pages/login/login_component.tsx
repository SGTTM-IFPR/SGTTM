import React, { useState } from 'react';
import './login_component.css';

export const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!username || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        console.log(`Nome de usuário: ${username}, Senha: ${password}`);
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">CPF ou E-mail</label><br></br>
                    <input placeholder='CPF ou E-mail' type="text" id="username" value={username} onChange={event => setUsername(event.target.value)} />
                </div>

                <div>
                    <br></br>
                    <label htmlFor="password">Senha</label><br></br>
                    <input placeholder='Senha' type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} />
                </div>
                <br></br>
                <div className='div_botao'>
                    <button className='primeiro' type="submit">Login</button>
                    <a href='/test'>Esqueci minha senha</a>
                </div>
            </form >
        </div >
    );
};