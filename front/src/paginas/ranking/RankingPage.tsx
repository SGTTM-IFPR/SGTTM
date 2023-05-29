import { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import React from 'react';
import { Header } from 'antd/es/layout/layout';

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
        align: 'center',
      },
      {
        title: 'Usuário',
        dataIndex: 'nome',
        key: 'nome',
        align: 'center',
      },
      {
        title: 'Clube',
        dataIndex: 'clube',
        key: 'clube',
        align: 'center',
      },
      {
        title: 'Federação',
        dataIndex: 'federacao',
        key: 'federacao',
        align: 'center',
      },
      {
        title: 'Pontuação',
        dataIndex: 'pontos',
        key: 'pontos',
        align: 'center',
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
        <h2 style={{ textAlign: 'center' }}>{torneio}</h2>
        <Table
          columns={columns as any}
          dataSource={data}
          pagination={false}
          size="middle"
          bordered
        />
      </div>
    );
  };

  return (
    <>
      <Header
        style={{
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        <h1 style={{ marginRight: "auto" }}>Ranking</h1>
      </Header>
      {rankingData.map((data) =>
        renderRankingTable(data.torneio, data.ranking)
      )}
    </>
  );
};
