import React, { useEffect, useState } from 'react';
import { Table, Layout, Select, Collapse } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { getAllTournaments } from '../../servicos/TorneioServico';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

// css
import './RankingPage.css';

const { Column } = Table;
const { Header, Content } = Layout;
const { Option } = Select;
const { Panel } = Collapse;

interface Torneio {
  id: number;
  nome: string;
}

interface Ranking {
  nome: string;
  clube: string;
  federacao: string;
  pontuacao: number;
}

export const RankingPage = () => {
  const [rankings, setRankings] = useState<{ torneio: Torneio; rankings: Ranking[] }[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(moment().year());
  const [availableYears, setAvailableYears] = useState<JSX.Element[]>([]);


  useEffect(() => {
    const fetchRankings = async () => {
      try {
        let response = await axios.get(`http://localhost:5000/pontuacao/ranking?ano=${selectedYear}`);
        if (selectedYear === null) {
          response = await axios.get(`http://localhost:5000/pontuacao/ranking?ano=` + moment().year());
        }
        const data = response.data;

        const torneios: Torneio[] = data[1]?.map((record: any, index: number) => ({ id: index, nome: record.torneio }));
        const dataSource: { torneio: Torneio; rankings: Ranking[] }[] = [];

        torneios.forEach((torneio: Torneio) => {
          const torneioRankings: Ranking[] = data[0]?.filter((record: any) => {
            return (
              record[torneio.nome] !== undefined &&
              record[torneio.nome] !== 0 &&
              record[torneio.nome] !== '0' // Filtrar também valores como '0'
            );
          }).map((record: any) => {
            const { nome, clube, federacao } = record;
            const pontuacao = record[torneio.nome];
            return { nome, clube, federacao, pontuacao };
          });

          // Sort the rankings by pontuacao in descending order
          torneioRankings.sort((a: any, b: any) => b.pontuacao - a.pontuacao);

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

  useEffect(() => {
    getAllTournaments().then((response) => {
      const uniqueYears = new Set<number>();
      response.forEach((tournament) => {
        const year = Number(tournament.data_final?.substring(0, 4));
        if (!isNaN(year)) {
          uniqueYears.add(year);
        }
      });
      const options = Array.from(uniqueYears).map((year) => (
        <Option key={year} value={year}>
          {year}
        </Option>
      ));
      setAvailableYears(options);
    });
  }, []);

  const FirstRow = ({ children }: { children: React.ReactNode }) => (
    <tr style={{ backgroundColor: "black" }}>{children}</tr>
  );

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
            {/* <Option value={moment().year()}>{moment().year()}</Option>
            <Option value={moment().year() - 1}>{moment().year() - 1}</Option> */}
            {availableYears.length > 0 && availableYears}
            {/* Add more options for different years */}
          </Select>
        </Header>

        <Content>
          <Collapse>
            {rankings.map((torneioRanking) => (
              <Panel header={torneioRanking.torneio.nome} key={torneioRanking.torneio.id}>
                <Table
                  locale={{ emptyText: 'Não há dados' }}
                  dataSource={torneioRanking.rankings}
                  pagination={false}
                  rowKey={(record) => record.nome}
                  rowClassName={(_, index) =>
                    index === 0 ? 'golden-row' : index === 1 ? 'silver-row' : index === 2 ? 'bronze-row' : ''
                  }
                >
                  <Column title="Posição" key="posicao" render={(_, __, index) => (
                    index < 3 ? (
                      <FontAwesomeIcon
                        icon={faMedal}
                        className={index === 0 ? 'golden-icon' : index === 1 ? 'silver-icon' : 'bronze-icon'}
                      />
                    ) : index + 1
                  )} />
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
