import { useState } from 'react';
import './Login.css';
import { FaTableTennis } from 'react-icons/fa';
import { LoginComponente } from './LoginComponente';
import { BotaoCriarUsuario } from '../../componentes/usuario/BotaoCriarUsuario';
import { UsuarioData } from '../../datas/UsuarioData';

export const LoginPagina = () => {
    const [data, setData] = useState<UsuarioData[]>([]);
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
                    <LoginComponente />
                </div>
                <div style={{ marginLeft: '50px', marginBottom: '5px' }}>
                    <BotaoCriarUsuario setData={setData} local='login' />
                </div>
                <div></div>
                <div></div>
            </div>
        </div >
    );
}
