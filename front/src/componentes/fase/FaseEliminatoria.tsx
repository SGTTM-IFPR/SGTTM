import { Row, Spin } from "antd";
import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import { getAllPartidasByTorneioId, getPartidaByEtapaAndTorneioId } from "../../servicos/PartidaService";
import { useEffect, useState } from "react";
import { PartidaData } from "../../datas/PartidaData";

function montar_partida(partidas: any[]) {
    const matches = [];
    console.log("partidas", partidas.length);
    for (let i = 0; i < partidas.length; i++) {
        // console.log("uma repeticao");
        const partida = partidas[i];
        if (partida.etapa.toUpperCase() !== "PRIMEIRA FASE") {
            console.log("partida", partida);
            // finalizar if
            const estado_partida = "DONE";
            // if (partida.concluida === false) {
            //     const estado_partida = "DONE";
            // } else {
            //     const estado_partida = "PENDING";
            // }
            const match = {
                "id": partida.id,
                "name": partida.etapa.toUpperCase(),
                // buscar o id da proxima partida
                // buscar o id da partida que tem o partida.inscricao_atleta1.id ou partida.inscricao_atleta2.id
                // primeiro tentar adicionar o id da proxima partidas nas partidas
                "nextMatchId": partida.id_proxima_partida,
                // "tournamentRoundText": "4",
                "startTime": "09/06/2023",
                "state": estado_partida,
                "participants": [
                    {
                        "id": partida.inscricao_atleta1?.id ?? 0,
                        "resultText": partida.pontos_atleta_1.toString(),
                        "isWinner": false,
                        "status": null,
                        "name": partida.inscricao_atleta1?.usuario.nome ?? "A Definir"
                    },
                    {
                        "id": partida.inscricao_atleta2?.id ?? 0,
                        "resultText": partida.pontos_atleta_2.toString(),
                        "isWinner": false,
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
    const [partidas_oitavas, setPartidas_oitavas] = useState<PartidaData[]>([]);
    const [partidas_quartas, setPartidas_quartas] = useState<PartidaData[]>([]);
    const [match_todas, setMatch_todas] = useState<any[]>([]);
    const torneioId = 1;

    useEffect(() => {
        const fetchPartidas = async () => {
            if (!torneioId) return;
            // await getPartidaByEtapaAndTorneioId("OITAVAS_FINAL", torneioId).then((partidaData) => {
            //     setPartidas_oitavas(partidaData);
            //     setMatch_todas(montar_partida(partidaData));
            // });
            // await getPartidaByEtapaAndTorneioId("QUARTAS_FINAL", torneioId).then((partidaData) => {
            //     setPartidas_quartas(partidaData);
            //     setMatch_todas(montar_partida(partidaData));
            // });
            await getAllPartidasByTorneioId(torneioId).then((partidaData) => {
                setPartidas_oitavas(partidaData);
                setMatch_todas(montar_partida(partidaData));
            });
        };
        fetchPartidas();
    }, [torneioId]);
    // console.log("match_todas", match_todas);

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
                {/* <Row gutter={[24, 0]} style={{ width: "100%", height: "800px" }}> */}
                {match_todas.length > 0 ? (
                    <SingleEliminationBracket
                        matches={match_todas}
                        matchComponent={Match}
                        svgWrapper={({ children, ...props }) => (
                            // background={'#0b0d12'} SVGBackground={'#0b0d12'} para mudar cor de fundo
                            <SVGViewer width={3000} height={900}{...props}>
                                {children}
                            </SVGViewer>
                        )}
                    />
                ) : (
                    <Spin size="large" />
                )}
                {/* </Row> */}

            </div>
        </>
    );
};
