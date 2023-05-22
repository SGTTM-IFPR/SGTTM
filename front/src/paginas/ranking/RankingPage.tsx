import { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import React from 'react';

interface Ranking {
  nome: string;
  pontos: number;
  clube: string;
  federacao: string;
}

interface RankingData {
  torneio: string;
  ranking: Ranking[];
}

export const RankingPage = () => {
  const [rankingData, setRankingData] = useState<RankingData[]>([]);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const response = await axios.get<RankingData[]>('http://localhost:5000/pontuacao/ranking');
        setRankingData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRankingData();
  }, []);

  const renderRankingTable = (torneio: string, ranking: Ranking[]) => {
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
        title: 'Clube',
        dataIndex: 'clube',
        key: 'clube',
      },
      {
        title: 'Federação',
        dataIndex: 'federacao',
        key: 'federacao',
      },
      {
        title: 'Pontuação',
        dataIndex: 'pontos',
        key: 'pontos',
      },
    ];

    const data = ranking.map((rank, index) => ({
      key: index + 1,
      position: index + 1,
      nome: rank.nome,
      clube: rank.clube,
      federacao: rank.federacao,
      pontos: rank.pontos,
    }));

    return (
      <div key={torneio}>
        <h2>Torneio {torneio}</h2>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  };

  return (
    <div>
      <h1>Ranking</h1>
      {rankingData.map((data) =>
        renderRankingTable(data.torneio, data.ranking)
      )}
    </div>
  );
};

export default RankingPage;
