import React, { useState } from 'react';
import './login.css';
import { FaTableTennis } from 'react-icons/fa';
import { LoginComponent } from './login_component';
import { Button } from 'antd';
import { ButtonCreateUser } from '../../components/user/ButtonCreateUser';
import { UserData } from '../../datas/UserData';

export const LoginPage = () => {
    const [data, setData] = useState<UserData[]>([]);
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
                    {/* <Button type="primary" style={{borderRadius: '15px', border: 'none', fontSize: '1.0em', textDecoration: 'none', backgroundColor: 'rgb(4, 169, 235)', color: 'white'}}>Não tem conta? Cadastre-se</Button> */}
                    <ButtonCreateUser setData={setData} />
                </div>
                <div></div>
                <div></div>
            </div>
        </div >
    );
}
