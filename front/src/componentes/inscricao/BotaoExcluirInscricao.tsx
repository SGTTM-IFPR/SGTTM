import { useState } from 'react';
import { deleteInscricao, getInscricaoByTorneioId } from '../../servicos/InscricaoServico';
import { Button, Modal, message } from 'antd';
import { InscricaoData } from '../../datas/InscricaoData';
import { useTorneioContext } from '../../paginas/torneio/context/TorneioContext';

type Props = {
    idInscricao?: number;
};

export const BotaoExcluirInscricao: React.FC<Props> = ({
    idInscricao: idInscricao,
}) => {
    const {inscricoes, setInscricoes, torneio} = useTorneioContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    async function onSubmit(idInscricao?: number) {
        try {
            const response = await deleteInscricao(idInscricao!)
            setIsModalOpen(false);
            const inscricoesAtualizadas = await getInscricaoByTorneioId(torneio!.id!);
            setInscricoes(inscricoesAtualizadas);
            message.success('Inscrição excluída com sucesso!');
        } catch (error) {
            message.error('Erro ao excluir inscrição!');
            setIsModalOpen(false);
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