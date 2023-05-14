import { useParams } from 'react-router-dom';
import { getTorneioById } from '../../servicos/TorneioServico';
import { getInscricaoByTorneioId } from '../../servicos/InscricaoServico';
import { getGruposByTorneioId } from '../../servicos/GrupoServico';
import { TorneioData } from '../../datas/TorneioData';
import { useState, useEffect, useContext } from 'react';
import { Row, Descriptions } from 'antd';
import { format } from 'date-fns';
import { InscricaoData } from '../../datas/InscricaoData';
import { InscricaoTable } from '../../componentes/inscricao/InscricaoTable';
import { Collapse } from 'antd';
import { Divider, Steps } from 'antd';
import { BotaoCriarInscricao } from '../../componentes/inscricao/BotaoCriarInscricao';
import { BotaoCriarGrupo } from '../../componentes/grupo/BotaoCriarGrupo';
import { FaseGrupo } from '../../componentes/fase/FaseGrupo';
import { GrupoData } from '../../datas/GrupoData';
import { DataFormatada } from '../../componentes/data/FormatarData';
import { VerificarIdUsuario } from '../../componentes/autenticacao/VerificarIdUsuario';
import { AutheticationContext, useAuth } from '../../autenticacao/context/AuthenticationContext';

const { Panel } = Collapse;

interface ITimeExpirated {
    dias?: number;
    horas?: number;
    minutos?: number;
    segundos?: number;
}

export const TorneioPage = () => {
    const { identity } = useAuth();
    const usuario_id = VerificarIdUsuario();
    let usuarioEncontrado = false;
    const { id } = useParams<{ id: string }>();
    const [torneio, setTorneio] = useState<TorneioData | null>(null);
    const [inscricoes, setInscricoes] = useState<InscricaoData[] | null>(null);
    const [grupos, setGrupos] = useState<GrupoData[] | null>(null);
    let visibleButtonInscricao = true;
    let visibleButtonGrupo = false;
    const millisecondsPerSecond = 1000;
    const secondsPerMinute = 60;
    const minutesPerHour = 60;
    const hoursPerDay = 24;
    const millisecondsPerMinute = millisecondsPerSecond * secondsPerMinute;
    const millisecondsPerHour = millisecondsPerMinute * minutesPerHour;
    const millisecondsPerDay = millisecondsPerHour * hoursPerDay;
    const calculateExpirated = () => {
        let timeExpirated: ITimeExpirated = {};
        if (!torneio?.data_inicio)
            return timeExpirated;
        let year = new Date().getFullYear();
        const tournamentStartDate = new Date(torneio.data_inicio);
        const timeDifferenceInMilliseconds = tournamentStartDate.getTime() - new Date().getTime();
        timeExpirated = {
            dias: Math.floor(timeDifferenceInMilliseconds / millisecondsPerDay),
            horas: Math.floor((timeDifferenceInMilliseconds % millisecondsPerDay) / millisecondsPerHour),
            minutos: Math.floor((timeDifferenceInMilliseconds % millisecondsPerHour) / millisecondsPerMinute),
            segundos: Math.floor((timeDifferenceInMilliseconds % millisecondsPerMinute) / millisecondsPerSecond),
        };
        return timeExpirated;
    }

    const [timeExpirated, setTimeExpirated] = useState(calculateExpirated());

    const timeExpiratedCompost: JSX.Element[] = [];


    const [current, setCurrent] = useState(0);


    const onChange = (value: number) => {
        console.log('onChange:', value);
        setCurrent(value);
    };

    const description = '';

    Object.keys(timeExpirated).forEach((interval) => {
        const key = interval as keyof ITimeExpirated;
        if (!timeExpirated[key]) {
            return;
        }
        timeExpiratedCompost.push(
            <span key={interval}>
                {timeExpirated[key]} {interval}{" "}
            </span>
        );
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeExpirated(calculateExpirated());
        }, 100);
        return () => clearTimeout(timer);
    });

    useEffect(() => {
        const fetchTorneio = async () => {
            if (!id)
                return;
            const parsedId = parseInt(id);
            if (isNaN(parsedId)) {
                console.error(`Invalid id: ${id}`);
                return;
            }

            try {
                setTorneio(await getTorneioById(parsedId));
            } catch (error) {
                console.error(error);
            }
        };
        fetchTorneio();
    }, [id]);


    const fetchGrupos = async () => {
        if (!torneio || !torneio.id)
            return;
        await getGruposByTorneioId(torneio.id).then((grupoList) => setGrupos(grupoList));
    };

    useEffect(() => {
        const fetchInscricoes = async () => {
            if (!torneio || !torneio.id)
                return;
            await getInscricaoByTorneioId(torneio.id).then((inscricaoData) => setInscricoes(inscricaoData))
        };
        fetchInscricoes();
        fetchGrupos();
    }, [torneio]);

    if (!torneio) {
        return <div>Loading...</div>;
    }
    if (inscricoes !== null) {
        const encontrar = inscricoes!.some((item) => item.usuario?.id === usuario_id);
        if (encontrar) {
            usuarioEncontrado = true;
        }
    }

    const fases = [
        {
            title: 'Fase de Grupos',
            description,
            content: <FaseGrupo grupos={grupos} />

        },
        {
            title: 'Eliminatórias',
            description,
            content: <div style={{ height: '700px', backgroundColor: 'green', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'white', borderRadius: "15px", margin: "10px" }}>Fazer um componente para Eliminatórias</div>
        },
        // {
        //     title: 'Terceiro Lugar',
        //     description,
        //     content: <div style={{ height: '700px', backgroundColor: '#f5ff3b', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>Fazer um componente para disputa de terceiro lugar</div>
        // },
    ];
    {
        if (usuarioEncontrado || torneio.status !== "Aberto") {
            visibleButtonInscricao = false;
        }
        if (identity.isAdmin && torneio.status !== "Aberto") {
            visibleButtonGrupo = true;
        }
    }
    return (
        <div >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '24px' }}>
                <h1 style={{ margin: 0 }}><strong>{torneio?.nome?.toUpperCase()}</strong></h1>

                <div style={{ fontSize: '20px', color: 'gray' }}>
                    {timeExpiratedCompost.length ? timeExpiratedCompost : null}
                </div>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Descriptions labelStyle={{ fontSize: '20px' }} contentStyle={{ fontSize: '22px' }} >
                    <Descriptions.Item label="Data inicial"><DataFormatada data={torneio?.data_inicio?.toString()!} /></Descriptions.Item>
                    <Descriptions.Item label="Data final"><DataFormatada data={torneio?.data_final?.toString()!} /></Descriptions.Item>
                </Descriptions>
                <Descriptions labelStyle={{ fontSize: '20px' }} contentStyle={{ fontSize: '22px' }}>
                    <Descriptions.Item label="Tipo">{torneio?.tipo_torneio}</Descriptions.Item>
                    <Descriptions.Item label="Status">{torneio?.status}</Descriptions.Item>
                </Descriptions>
                {identity.isAdmin &&
                    <BotaoCriarGrupo idTournament={torneio?.id} torneioData={torneio} onCreateGrupo={fetchGrupos} quantidade_inscritos={inscricoes?.length} visibleButton={visibleButtonGrupo} />
                }
                <BotaoCriarInscricao idTournament={torneio?.id} visible={visibleButtonInscricao} />
            </div>
            <div style={{ marginTop: '20px' }}>
                <Collapse ghost style={{ backgroundColor: '#f0f8ff' }}>
                    <Panel header={<span >Inscritos ({inscricoes?.length})</span>} key="1" style={{ color: 'white' }}>
                        <div style={{ width: '80%', margin: '0 auto' }}>
                            {<InscricaoTable inscricoes={inscricoes} />}
                        </div>
                    </Panel>
                </Collapse>
                <div style={{ justifyContent: 'center', width: '100%', textAlign: 'center' }}>
                    <h2>Fases</h2>
                </div>

            </div>

            <Steps
                current={current}
                onChange={onChange}
                items={fases}
            />
            <div>
                {fases[current].content}
            </div>
        </div>
    );
};