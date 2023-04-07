import React from 'react';
import './login.css';
import { FaTableTennis } from 'react-icons/fa';
import { LoginComponent } from './login_component';

export const Login = () => {
    return (
        <div className="login">
            <div className="green">
                <div>
                    <FaTableTennis /> SGTTM - IFPR
                </div>
                <div>
                    <div className='title'>Bem-vindo ao SGTTM!</div>
                    <div className='icon'><FaTableTennis /></div>
                    <div className='subtitle'> Sistema para Gerenciamento de Torneio de Tênis de Mesa </div>
                </div>
                <div></div>
                <div></div>
                <div>Desenvolvido por Carlos, Nicolas e Rafhael | Estudantes IFPR</div>
            </div>
            <div className="white">
                <div className='div_titulo'>
                    Bem-vindo! <br></br>
                    Insira suas credenciais de participante:
                </div>
                <div className='div_login'>
                    <LoginComponent />
                </div>
                <div>
                    <a className='segundo' type='submit' href='test'>Não tem conta? Cadastre-se</a>
                </div>
                <div></div>
                <div></div>
            </div>
        </div >
    );
}
