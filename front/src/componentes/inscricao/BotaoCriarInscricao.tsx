import { useState } from 'react';
import { createInscricao, getAllInscricoes } from '../../servicos/InscricaoServico';
import { InscricaoData } from '../../datas/InscricaoData';
import { gray } from '@ant-design/colors';
import { Button, Form, Input, Modal } from 'antd';
import { SelecaoEnum } from './SelecaoEnum';
import { MyEnum, enumOpcoes } from './EnumOpcao';
import { buscarIdPorCpf } from '../../servicos/UsuarioServico';

type Props = {
    idTournament?: number;
};

export const BotaoCriarInscricao: React.FC<Props> = ({
    idTournament: idTournament,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [output, setOutput] = useState('');
    const [selectedOption, setSelectedOption] = useState(MyEnum.PROFESSOR_IFPR);
    const [selectedCpf, setSelectedCpf] = useState('');
    const [selectedIdUser, setSelectedIdUser] = useState(0);

    const handleOptionChange = (value: MyEnum) => {
        setSelectedOption(value);
    };

    async function handleOptionChangeCpf(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setSelectedCpf(value);
        // buscar id do usuario por cpf
        await buscarIdPorCpf(value).then((idUser) => setSelectedIdUser(idUser));
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    async function onSubmit(data: InscricaoData) {
        try {
            const response = await createInscricao(data)
            setIsModalOpen(false);
            location.reload();
        } catch (error) {
            console.error(error);
            setOutput(JSON.stringify(error, null, 2));
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        location.reload();
    };

    const modalStyle = {
        backgroundColor: gray[6],
    };

    const handleOk = (idTournament?: number) => {
        // criar estrutura de inscrição
        const inscricao: InscricaoData = {
            torneio_id: idTournament,
            usuario_id: selectedIdUser,
            condicao: selectedOption,
        };
        console.log(inscricao);
        onSubmit(inscricao);
    };

    return (
        <>
            <Button
                size='middle'
                type="primary"
                style={{ background: "green", marginLeft: 10 }}
                onClick={showModal}
            >
                Inscrever-se agora!
            </Button>
            <Modal
                title="Confirmar Inscrição"
                open={isModalOpen}
                onCancel={handleCancel}
                centered={true}
                getContainer={false}
                footer={null}
            >
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={() => handleOk(idTournament)}
                >
                    <Form.Item name="condicao" label="Condição">
                        <SelecaoEnum
                            options={enumOpcoes}
                            value={selectedOption}
                            onChange={handleOptionChange}
                        />
                    </Form.Item>
                    <Form.Item name="cpf" label="CPF" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <Input placeholder={"Por favor, confirme seu CPF"} onChange={handleOptionChangeCpf} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            style={{ backgroundColor: "green-6", height: 40 }}
                            type="primary"
                            htmlType="submit"
                        >
                            Confirmar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal >
        </>
    );
};