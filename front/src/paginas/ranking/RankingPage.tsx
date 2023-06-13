import React, { useEffect, useState } from 'react';
import { Table, Layout, Select, Collapse } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Column } = Table;
const { Header, Content } = Layout;
const { Option } = Select;
const { Panel } = Collapse;

interface Ranking {
  nome: string;
  clube: string;
  federacao: string;
  [torneio: string]: number | string;
}

export const RankingPage = () => {
  const [rankings, setRankings] = useState<{ torneio: string; rankings: Ranking[] }[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(moment().year());

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        let response = await axios.get(`http://localhost:5000/pontuacao/ranking?ano=${selectedYear}`);
        if (selectedYear === null) {
          response = await axios.get(`http://localhost:5000/pontuacao/ranking?ano=2023`);
        }
        const data = response.data;

        // Group rankings by torneio
        const torneios = data[1]?.map((record: any) => record.torneio);
        const dataSource: any[] = [];
        torneios.forEach((torneio: string) => {
          const torneioRankings = data[0]?.map((record: any) => {
            const { nome, clube, federacao } = record;
            const pontuacao =
              data[1]?.find((item: any) => item.torneio === torneio)?.ranking.find((r: any) => r.nome === nome)?.[torneio] || 0;
            return { nome, clube, federacao, pontuacao };
          });

          dataSource.push({ torneio, rankings: torneioRankings });
        });

        setRankings(dataSource);
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
          <Collapse>
            {rankings.map((torneioRanking) => (
              <Panel header={torneioRanking.torneio} key={torneioRanking.torneio}>
                <Table dataSource={torneioRanking.rankings} pagination={false}>
                  <Column title="Nome" dataIndex="nome" key="nome" />
                  <Column title="Clube" dataIndex="clube" key="clube" />
                  <Column title="Federação" dataIndex="federacao" key="federacao" />
                  <Column
                    title="Ranking"
                    dataIndex="pontuacao"
                    key="pontuacao"
                    render={(text: number) => (text ? text : 0)}
                  />
                </Table>
              </Panel>
            ))}
          </Collapse>
        </Content>
      </div>
    </Layout>
  );
};

export default RankingPage;