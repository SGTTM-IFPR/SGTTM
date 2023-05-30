import { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

interface Ranking {
  nome: string;
  clube: string;
  federacao: string;
  [torneio: string]: number | string;
}

export const RankingPage = () => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pontuacao/ranking');
        const data = response.data;

        // Extrair colunas de torneios e criar o conjunto de colunas dinâmicas
        const torneios = data[1]?.map((record: any) => record.torneio);
        const dataSource = data[0]?.map((record: any) => {
          const { nome, clube, federacao } = record;
          const pontuacoes: any = {};

          data[1]?.forEach((item: any) => {
            pontuacoes[item.torneio] =
              item.ranking.find((r: any) => r.nome === nome)?.[item.torneio] || 0;
          });

          return {
            nome,
            clube,
            federacao,
            ...pontuacoes,
          };
        });

        const columns = [
          {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
          },
          {
            title: 'Clube',
            dataIndex: 'clube',
            key: 'clube',
          },
          {
            title: 'Federação',
            dataIndex: 'federacao',
            key: 'federacao',
          },
          ...(torneios || []).map((torneio: string) => ({
            title: torneio,
            dataIndex: torneio,
            key: torneio,
            render: (text: number) => (text ? text : 0),
          })),
        ];

        setRankings(dataSource);
        setColumns(columns);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRankings();
  }, []);

  return (
    <div>
      <h1>Ranking</h1>
      <Table columns={columns} dataSource={rankings} pagination={false} />
    </div>
  );
};

export default RankingPage;
