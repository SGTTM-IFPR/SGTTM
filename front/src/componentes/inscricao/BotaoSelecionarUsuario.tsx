import React, { useState } from 'react';
import { AutoComplete, Button, Select, Modal, Form, message } from 'antd';
import { SelecaoEnum } from './SelecaoEnum';
import { MyEnum, enumOpcoes } from './EnumOpcao';
import { buscarIdPorNome, getAllUsers } from '../../servicos/UsuarioServico';
import { InscricaoData } from '../../datas/InscricaoData';
import { createInscricao, getInscricaoByTorneioId } from '../../servicos/InscricaoServico';
import { useTorneioContext } from '../../paginas/torneio/context/TorneioContext';

const { Option } = Select;

type Props = {
    visibleButton: boolean;
};

export const BotaoSelecionarUsuario: React.FC<Props> = ({ visibleButton }) => {
    let id_usuario: Promise<number>;
    const { torneio,  findInscricoes } = useTorneioContext();
    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(MyEnum.PROFESSOR_IFPR);

    const handleSearch = async (value: string) => {
        setSearchText(value);

        // Aqui você pode fazer uma chamada para o backend ou realizar qualquer lógica de pesquisa
        // para obter os resultados com base no texto digitado
        const searchResults = performSearch(value);
        setResults(await searchResults);
    };

    const handleOptionChange = (value: MyEnum) => {
        setSelectedOption(value);
    };

    const performSearch = async (text: string): Promise<string[]> => {
        if(!torneio)
            return [];

        const lista_inscritos = await getInscricaoByTorneioId(torneio.id!);
        const lista_inscritos_id = lista_inscritos.map((inscricao) => inscricao.usuario_id);

        const users = await getAllUsers(); // Chamada ao serviço para obter os usuários

        // Extrair apenas os nomes dos usuários cujo ID não esteja na lista de inscritos
        const names = users
            .filter((user) => !lista_inscritos_id.includes(user.id)) // Filtrar os usuários não inscritos
            .map((user) => user.nome)
            .filter((nome) => nome !== undefined && nome !== null) as string[]; // Converter para o tipo string[]

        // Filtramos os nomes com base no texto de pesquisa
        const filteredNames = names.filter((nome) =>
            nome.toLowerCase().includes(text.toLowerCase())
        );

        return filteredNames;
    };


    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleOk = async () => {
        if(!torneio || !torneio.id)
            return;
        try {
            const usuario = buscarIdPorNome(searchText);

            const inscricao: InscricaoData = {
                torneio_id: torneio.id!,
                usuario_id: (await usuario).valueOf(),
                condicao: selectedOption,
            };

            await createInscricao(inscricao)
            setModalVisible(false);
            findInscricoes();
            message.success('Inscrição realizada com sucesso!');
        } catch (error) {
            message.error('Erro ao realizar inscrição!');
            message.error('Selecione um usuário!');
        }
    };

    if (!visibleButton) {
        return (
            <Button size='middle'
            type="primary"
            style={{ background: "red", color: "white", fontWeight: "bold" }}
            disabled>
                Incluir usuários indisponível
            </Button>
        );
    }

    return (
        <>
            <Button onClick={handleOpenModal}
                size='middle'
                type="primary"
            >
                Incluir Usuário
            </Button >
            <Modal
                title="Selecionar Usuário"
                open={modalVisible}
                centered={true}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="cancel" onClick={handleCloseModal}>
                        Cancelar
                    </Button>,
                    <Button key="confirm" type="primary" onClick={handleOk}>
                        Confirmar
                    </Button>,
                ]}
            >
                <Form.Item name="condicao" label="Condição">
                    <SelecaoEnum
                        options={enumOpcoes}
                        value={selectedOption}
                        onChange={handleOptionChange}
                    />
                </Form.Item>
                <Form.Item name="usuario" label="Usuário" rules={[
                    {
                        required: true,
                        message: 'Por favor, selecione um usuário!',
                    },
                ]}>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        value={searchText}
                        onChange={(value) => setSearchText(value)}
                        onSearch={handleSearch}
                        placeholder="Digite o nome"
                        optionFilterProp="children"

                    >
                        {results.map((result, index) => (
                            <Option key={index} value={result}>
                                {result}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Modal>
        </>
    );
};
