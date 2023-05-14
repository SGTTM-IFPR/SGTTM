import { useState } from 'react';
import { createInscricao } from '../../servicos/InscricaoServico';
import { InscricaoData } from '../../datas/InscricaoData';
import { Button, Form, Modal, message } from 'antd';
import { SelecaoEnum } from './SelecaoEnum';
import { MyEnum, enumOpcoes } from './EnumOpcao';
import { VerificarIdUsuario } from '../autenticacao/VerificarIdUsuario';

type Props = {
    idTournament?: number;
    visible?: boolean;
};

export const BotaoCriarInscricao: React.FC<Props> = ({
    idTournament: idTournament,
    visible: visible,
}) => {
    const usuario_id = VerificarIdUsuario();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(MyEnum.PROFESSOR_IFPR);

    const handleOptionChange = (value: MyEnum) => {
        setSelectedOption(value);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    async function handleOk(idTournament?: number) {
        // criar estrutura de inscrição
        const inscricao: InscricaoData = {
            torneio_id: idTournament,
            usuario_id: usuario_id,
            condicao: selectedOption,
        };

        const response = await createInscricao(inscricao)
        setIsModalOpen(false);
        message.success('Inscrição realizada com sucesso!');
    };

    if (!visible) {
        return <Button
            size='middle'
            type="primary"
            style={{ background: "red", color: "white", fontWeight: "bold" }}
            onClick={showModal}
            disabled
        >
            Inscrição indisponível
        </Button>
    }

    return (
        <>
            <Button
                size='middle'
                type="primary"
                style={{ background: "green" }}
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