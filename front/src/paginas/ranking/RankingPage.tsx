import React, { useEffect, useState } from 'react';
import { Table, Layout, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Column } = Table;
const { Header, Content } = Layout;
const { Option } = Select;

interface Ranking {
  nome: string;
  clube: string;
  federacao: string;
  [torneio: string]: number | string;
}

export const RankingPage = () => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState(moment().year());

  useEffect(() => {
    const fetchRankings = async () => {
      try {

        let response = await axios.get(`http://localhost:5000/pontuacao/ranking?ano=${selectedYear}`);
        if(selectedYear == null) response = await axios.get(`http://localhost:5000/pontuacao/ranking?ano=2023`);
        const data = response.data;

        // Extract tournament columns and create dynamic column set
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
  }, [selectedYear]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <Layout>
      <div>
        <Header
          style={{
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '20px',
          }}
        >
          <h1 style={{ marginRight: 'auto' }}>Ranking</h1>
          <Select defaultValue={selectedYear} onChange={handleYearChange}>
            <Option value={moment().year()}>{moment().year()}</Option>
            <Option value={moment().year() - 1}>{moment().year() - 1}</Option>
            {/* Add more options for different years */}
          </Select>
        </Header>

        <Content>
          <Table dataSource={rankings} pagination={false}>
            {columns.map((column) => (
              <Column {...column} />
            ))}
          </Table>
        </Content>
      </div>
    </Layout>
  );
};

export default RankingPage;