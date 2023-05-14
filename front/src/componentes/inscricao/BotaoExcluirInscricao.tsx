import { useState } from 'react';
import { deleteInscricao } from '../../servicos/InscricaoServico';
import { Button, Modal, message } from 'antd';

type Props = {
    idInscricao?: number;
};

export const BotaoExcluirInscricao: React.FC<Props> = ({
    idInscricao: idInscricao,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    async function onSubmit(idInscricao?: number) {
        try {
            const response = await deleteInscricao(idInscricao!)
            setIsModalOpen(false);
            message.success('Inscrição excluída com sucesso!');
        } catch (error) {
            console.error(error);
            // setOutput(JSON.stringify(error, null, 2));
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button
                size='small'
                type='primary'
                style={{ background: "red" }}
                onClick={showModal}
            >
                Excluir Inscrito
            </Button>
            <Modal
                title="Confirmar Exclusão"
                open={isModalOpen}
                onCancel={handleCancel}
                centered={true}
                getContainer={false}
                footer={null}
            >
                <Button
                    type="primary"
                    onClick={() => onSubmit(idInscricao)}
                >
                    Confirmar
                </Button>
                <span> </span>
                <Button
                    type='primary'
                    danger
                    onClick={handleCancel}
                >
                    Cancelar
                </Button>
            </Modal >
        </>
    );
};