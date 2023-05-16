import { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

interface Ranking {
  id: number;
  nome: string;
  pontos: number;
}

export const RankingPage = () => {
  const [rankings, setRankings] = useState<Ranking[]>([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get<Ranking[]>('http://localhost:5000/pontuacao/ranking');
        setRankings(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRankings();
  }, []);

  const columns = [
    {
      title: 'Posição',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Usuário',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Pontuação',
      dataIndex: 'pontos',
      key: 'pontos',
    },
  ];

  const data = rankings.map((ranking, index) => ({
    key: ranking.id,
    position: index + 1,
    nome: ranking.nome,
    pontos: ranking.pontos,
  }));

  return (
    <div>
      <h1>Ranking</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default RankingPage;