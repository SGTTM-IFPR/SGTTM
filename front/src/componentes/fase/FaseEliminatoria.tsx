import { Divider, Spin } from "antd";
import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import { getAllPartidasByTorneioId } from "../../servicos/PartidaService";
import { useEffect, useState } from "react";
import { useWindowSize } from 'usehooks-ts';

function montar_partida(partidas: any[]) {
    const matches = [];

    for (let i = 0; i < partidas.length; i++) {
        const partida = partidas[i];

        if (partida.etapa.toUpperCase() !== "PRIMEIRA FASE") {
            const match = {
                "id": partida.id,
                "name": partida.etapa.toUpperCase(),
                "nextMatchId": partida.id_proxima_partida ?? null,
                "tournamentRoundText": "Eliminatório",
                "startTime": "09/06/2023",
                "state": "DONE",
                "participants": [
                    {
                        "id": partida.inscricao_atleta1?.id ?? 0,
                        "resultText": partida.pontos_atleta_1.toString(),
                        "isWinner": partida.pontos_atleta_1 > partida.pontos_atleta_2,
                        "status": null,
                        "name": partida.inscricao_atleta1?.usuario.nome ?? "A Definir"
                    },
                    {
                        "id": partida.inscricao_atleta2?.id ?? 0,
                        "resultText": partida.pontos_atleta_2.toString(),
                        "isWinner": partida.pontos_atleta_2 > partida.pontos_atleta_1,
                        "status": null,
                        "name": partida.inscricao_atleta2?.usuario.nome ?? "A Definir"
                    }
                ]
            };
            matches.push(match);
        }
    }
    console.log("matches", matches);
    return matches;
}

interface IFaseEliminatoriaProps { }

export const FaseEliminatoria = ({ }: IFaseEliminatoriaProps) => {
    const [match_todas, setMatch_todas] = useState<any[]>([]);
    const torneioId = 1;
    const { width, height } = useWindowSize()

    useEffect(() => {
        const fetchPartidas = async () => {
            if (!torneioId) return;
            await getAllPartidasByTorneioId(torneioId).then((partidaData) => {
                setMatch_todas(montar_partida(partidaData));
            });
        };
        fetchPartidas();
    }, [torneioId]);



    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "20px",
                    margin: "20px 20px",
                }}
            >

                {match_todas.length > 0 ? (
                    <SingleEliminationBracket
                        options={{
                            style: {
                                spaceBetweenRows: -10,
                                spaceBetweenColumns: 50,
                                width: 250,
                                // usar connectorColor: "#fff" como segunda opcao
                                // connectorColor: "#fff",
                            }
                        }}
                        matches={match_todas}
                        matchComponent={Match}
                        svgWrapper={({
                            children,
                            ...props
                        }) => (
                            // console.log("props", props),
                            // background={'#0b0d12'} SVGBackground={'#0b0d12'} para mudar cor de fundo
                            <SVGViewer width={width} height={height} {...props}>
                                {children}
                            </SVGViewer>

                        )}
                    />
                ) : (
                    <Spin size="large" />
                )}
            </div >
        </>
    );
};
