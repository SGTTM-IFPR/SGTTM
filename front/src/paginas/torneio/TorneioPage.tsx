import { useParams } from 'react-router-dom';
import { getTorneioById } from '../../servicos/TorneioServico';
import { getInscricaoByTorneioId } from '../../servicos/InscricaoServico';
import { TorneioData } from '../../datas/TorneioData';
import { useState, useEffect } from 'react';
import { Row, Descriptions  } from 'antd';
import { format } from 'date-fns';
import { InscricaoData } from '../../datas/InscricaoData';

interface ITimeExpirated {
    dias?: number;
    horas?: number;
    minutos?: number;
    segundos?: number;
}

export const TorneioPage = () => {
    const { id } = useParams<{ id: string }>();
    const [torneio, setTorneio] = useState<TorneioData | null>(null);
    const [inscricoes, setInscricoes] = useState<InscricaoData[] | null>(null);
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
        }, 1000);
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
        console.log(torneio)
    }, [id]);

    useEffect(() => {
        const fetchInscricoes = async () => {
        if(!torneio || !torneio.id)
            return;
        setInscricoes(await getInscricaoByTorneioId(torneio.id));
        };
        fetchInscricoes();
    }, [torneio]);

    if (!torneio) {
        return <div>Loading...</div>;
    }

    return (
        <div >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '24px' }}>
                <h1 style={{ margin: 0 }}><strong>{torneio?.nome?.toUpperCase()}</strong></h1>
                <div style={{ fontSize: '20px' , color: 'gray'}}>
                {timeExpiratedCompost.length ? timeExpiratedCompost : null}
            </div>
            </div>
            <div style={{ marginTop: '20px' }}>   
                <Descriptions labelStyle={{ fontSize: '20px'}} contentStyle={{ fontSize: '22px'}} >
                    <Descriptions.Item label="Data inicial">{torneio?.data_inicio}</Descriptions.Item>
                    <Descriptions.Item label="Data final">{torneio?.data_final}</Descriptions.Item>
                </Descriptions>
                <Descriptions labelStyle={{ fontSize: '20px'}} contentStyle={{ fontSize: '22px'}}>
                    <Descriptions.Item label="Tipo">{torneio?.tipo_torneio}</Descriptions.Item>
                </Descriptions>
            </div>
            {
                inscricoes?.length ? 
                    (<div style={{ marginTop: '20px' }}>
                        <h2 style={{ margin: 0 }}>Inscritos</h2>
                        <Row>
                            {inscricoes.map((inscricao) => (
                                <div key={inscricao.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
                                  {inscricao.id}
                                </div>
                            ))}
                        </Row> 
                       </div>)
                        :
                        <div>Nenhum inscrito</div> 

            }
            {/* render the rest of the torneio details */}
        </div>
    );
}
