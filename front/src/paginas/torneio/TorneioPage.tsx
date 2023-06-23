import { useParams } from 'react-router-dom';
import { criarPontuacao, nextFaseTournament as nextFaseService } from '../../servicos/TorneioServico';
import { getInscricaoByTorneioId } from '../../servicos/InscricaoServico';
import { getGruposByTorneioId } from '../../servicos/GrupoServico';
import { TorneioData } from '../../datas/TorneioData';
import { useState, useEffect, SetStateAction } from 'react';
import { Button, Col, Descriptions, Layout, Row } from 'antd';
import { InscricaoData } from '../../datas/InscricaoData';
import { InscricaoTable } from '../../componentes/inscricao/InscricaoTable';
import { Collapse } from 'antd';
import { Steps } from 'antd';
import { BotaoCriarInscricao } from '../../componentes/inscricao/BotaoCriarInscricao';
import { BotaoCriarGrupo } from '../../componentes/grupo/BotaoCriarGrupo';
import { FaseGrupo } from '../../componentes/fase/FaseGrupo';
import { GrupoData } from '../../datas/GrupoData';
import { DataFormatada } from '../../componentes/data/FormatarData';
import { VerificarIdUsuario } from '../../componentes/autenticacao/VerificarIdUsuario';
import { useAuth } from '../../autenticacao/context/AuthenticationContext';
import { BotaoSelecionarUsuario } from '../../componentes/inscricao/BotaoSelecionarUsuario';
import { Content, Header } from 'antd/es/layout/layout';
import './TorneioPage.css'
import { StepForwardOutlined } from '@ant-design/icons';
import { TorneioProvider } from './context/TorneioProvider';
import { useTorneioContext } from './context/TorneioContext';
import { FaseEliminatoria } from '../../componentes/fase/FaseEliminatoria';

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
    const { torneio, fetchTorneio } = useTorneioContext();
    const { inscricoes, setInscricoes } = useTorneioContext();
    const { grupos, setGrupos, findGrupos } = useTorneioContext();
    let visibleButtonInscricao = true;
    let visibleButtonGrupo = true;
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
        setCurrent(value);
    };


    const nextFaseTournament = async () => {
        if (current + 1 > 1) {
            return;
        }
        if (!torneio || !torneio.id) {
            return;
        }
        nextFaseService(torneio.id);
        setCurrent(torneio.fase_grupo_concluida ? 1 : 0);
        // esperar 2 segundos
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await fetchTorneio();
    };

    const finalizarTorneio = async () => {
        if (!torneio || !torneio.id)
            return;
        await criarPontuacao(torneio.id);
        await fetchTorneio();
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

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setTimeExpirated(calculateExpirated());
    //     }, 100);
    //     return () => clearTimeout(timer);
    // });

    const fetchGrupos = async () => {
        await fetchTorneio();
        findGrupos();
    };

    useEffect(() => {
        console.log(torneio);
        const fetchInscricoes = async () => {
            if (!torneio || !torneio.id)
                return;
            await getInscricaoByTorneioId(torneio.id).then((inscricaoData) => setInscricoes(inscricaoData))
        };
        fetchInscricoes();
        findGrupos();
    }, [torneio]);

    if (!torneio) {
        return <div>Loading...</div>;
    }
    if (inscricoes !== null) {
        const encontrar = inscricoes!.some((item) => {
            if (item.usuario?.id === usuario_id) {
                return true;
            }
            return false;
        });

        if (encontrar) {
            usuarioEncontrado = true;
        }
    }

    const fases = [
        {
            title: 'Fase de Grupos',
            description,
            content: <FaseGrupo />

        },
        {
            title: 'Fase Eliminatória',
            description,
            content: <FaseEliminatoria />
        },
    ];
    {
        if (usuarioEncontrado || torneio.status !== "Aberto") {
            visibleButtonInscricao = false;
        }
        if (torneio.status !== "Aberto") {
            visibleButtonGrupo = false;
        }
    }

    return (
        <Layout>
            <Header style={{
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "20px",
            }}>
                <h2 style={{ color: 'white', marginRight: "auto" }}>{torneio?.nome?.toUpperCase()}</h2>
                <Row gutter={18}>
                    <Col>
                        <BotaoCriarInscricao idTournament={torneio?.id} visibleButton={visibleButtonInscricao} />
                    </Col>
                    <Col>
                        {identity.isAdmin &&
                            <BotaoSelecionarUsuario visibleButton={visibleButtonGrupo} />
                        }
                    </Col>
                    <Col>
                        {identity.isAdmin &&
                            <BotaoCriarGrupo idTournament={torneio?.id} torneioData={torneio} onCreateGrupo={fetchGrupos} quantidade_inscritos={inscricoes?.length} visibleButton={visibleButtonGrupo} />
                        }
                    </Col>
                    <Col>
                        {(torneio.tipo_torneio === "Copa" && torneio.fase_grupo_concluida && identity.isAdmin && torneio.fase_atual == "Fase de grupos") &&
                            <Button size='middle'
                                type="default"
                                className="hover-effect"
                                onClick={nextFaseTournament}
                            >

                                <span>Próxima fase</span>
                                <StepForwardOutlined />
                            </Button>
                        }
                    </Col>
                    <Col>
                        {(torneio.tipo_torneio === "Copa" && torneio.fase_grupo_concluida && identity.isAdmin && torneio.fase_atual != "Fase de grupos") &&
                            <Button size='middle'
                                type="default"
                                className="hover-effect"
                                onClick={finalizarTorneio}
                            >

                                <span>Finalizar Torneio</span>
                                <StepForwardOutlined />
                            </Button>
                        }
                    </Col>
                </Row>
                {/* <div style={{ fontSize: '20px', color: 'gray' }}>
                    {timeExpiratedCompost.length ? timeExpiratedCompost : null}
                </div> */}
            </Header>
            <Content style={{ paddingInline: '10px' }}>
                <div style={{ marginTop: '20px' }}>
                    <Descriptions labelStyle={{ fontSize: '20px' }} contentStyle={{ fontSize: '22px' }} >
                        <Descriptions.Item label="Data inicial"><DataFormatada data={torneio?.data_inicio?.toString()!} /></Descriptions.Item>
                        <Descriptions.Item label="Data final"><DataFormatada data={torneio?.data_final?.toString()!} /></Descriptions.Item>
                    </Descriptions>
                    <Descriptions labelStyle={{ fontSize: '20px' }} contentStyle={{ fontSize: '22px' }}>
                        <Descriptions.Item label="Tipo">{torneio?.tipo_torneio}</Descriptions.Item>
                        <Descriptions.Item label="Status">{torneio?.status === "EM_ANDAMENTO" ? "Em andamento" : torneio?.status}</Descriptions.Item>
                        <Descriptions.Item label="Fase">{torneio?.fase_atual}</Descriptions.Item>
                    </Descriptions>

                </div>
                <div style={{ marginTop: '20px' }}>
                    <Collapse ghost style={{ backgroundColor: '#f0f8ff' }}>
                        <Panel header={<span >Inscritos ({inscricoes?.length})</span>} key="1" style={{ color: 'white' }}>

                            <div style={{ width: '80%', margin: '0 auto' }}>
                                {<InscricaoTable />}
                            </div>
                        </Panel>
                    </Collapse>
                    <div style={{ justifyContent: 'center', width: '100%', textAlign: 'center' }}>
                        <h2>Fases</h2>
                    </div>
                </div>
                <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    <Steps
                        style={{ width: '80%', colorScheme: 'red' }}
                        current={current}
                        onChange={onChange}
                        items={fases}
                    />
                </div>
                <div style={{ margin: '10px' }}>
                    {fases[current].content}
                </div>
            </Content>
        </Layout >
    );
};