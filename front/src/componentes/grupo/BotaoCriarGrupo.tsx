import { Button, Form, Modal, Radio, Typography, message } from "antd";
import { getInscricaoById, getNumeroClassificados, montarGrupos } from "../../servicos/InscricaoServico";
import { useState } from "react";
import { updateTournament } from "../../servicos/TorneioServico";
import { TorneioData } from "../../datas/TorneioData";
import { TesteData } from "../../datas/TesteData";

type Props = {
    idTournament?: Number;
    torneioData?: TorneioData;
    onCreateGrupo: () => void;
    quantidade_inscritos?: Number;
    visibleButton?: boolean;
};


export const BotaoCriarGrupo: React.FC<Props> = ({
    idTournament: idTournament,
    torneioData = {} as TorneioData,
    onCreateGrupo,
    quantidade_inscritos,
    visibleButton: visibleButton,
}) => {
    const [formValues, setFormValues] = useState({ formato: 'ALEATORIO', quantidade_classificados: 2 });
    const [visible, setVisible] = useState(false);
    const [grupos, setGrupos] = useState<TesteData>();
    const [form] = Form.useForm();

    const criarGrupo = async (formato: string, quantidade_classificados: number) => {
        if (typeof idTournament == "number") {
            torneioData.status = "EM_ANDAMENTO";
            updateTournament(idTournament, torneioData);

            await montarGrupos(idTournament, formato, quantidade_classificados);
            onCreateGrupo();
        }
    };

    const showModal = async () => {
        if (quantidade_inscritos === undefined || typeof quantidade_inscritos !== 'number' || quantidade_inscritos < 4) {
            message.error('Quantidade de inscritos insuficiente para iniciar o torneio!');
            return;
        }

        const grupos = await getNumeroClassificados(quantidade_inscritos!.valueOf());
        setGrupos(grupos);
        setVisible(true);
    };

    const onFinish = (values: any) => {
        try {
            console.log('Received values of form: ', values);
            const newValues = { ...formValues, ...values };
            criarGrupo(newValues.formato, newValues.quantidade_classificados);
            setVisible(false);
            message.success('Torneio iniciado com sucesso!');
        } catch (error) {
            message.error('Erro ao iniciar torneio!');
            setVisible(false);
        }
    };

    const handleCancel = () => {
        setVisible(false);
    };

    if (!visibleButton) {
        return <Button
            size='middle'
            type="primary"
            style={{ background: "red", color: "white", fontWeight: "bold" }}
            onClick={showModal}
            disabled
        >
            Inicio do Torneio indisponível
        </Button>
    }

    return (
        <>
            <Button
                size='middle'
                type="primary"
                style={{
                    background: "green", marginRight: 10
                }}
                onClick={showModal}
            >
                Iniciar Torneio
            </Button >
            <Modal
                open={visible}
                onOk={form.submit}
                onCancel={handleCancel}
                cancelText="Cancelar"
                title="Definição de Regras"
            >
                {/* <Typography>Quantidade de jogadores: {grupos}</Typography> */}
                <Typography><pre>Quantidade de grupos: {grupos?.numero_grupos}</pre></Typography>
                <Typography><pre>Quantidade de jogadores por grupo: {grupos?.minimo_jogadores}</pre></Typography>
                {grupos?.jogadores_extras! > 0 && (
                    <Typography><pre>Quantidade de jogadores extras por grupo: {grupos?.jogadores_extras}</pre></Typography>
                )}
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item name="formato" label="Tipo de distribuição" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <Radio.Group>
                            <Radio value="RANKING">Ranking</Radio>
                            <Radio value="ALEATORIO">Sorteio</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="quantidade_classificados"
                        label="Classificações"
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Radio.Group>
                            {grupos?.minimo_jogadores! >= 1 && (
                                <Radio value={1}>1</Radio>
                            )}
                            {grupos?.minimo_jogadores! >= 2 && (
                                <Radio value={2}>2</Radio>
                            )}
                            {grupos?.minimo_jogadores! >= 3 && (
                                <Radio value={3}>3</Radio>
                            )}
                            {grupos?.minimo_jogadores! >= 4 && (
                                <Radio value={4}>4</Radio>
                            )}
                            {grupos?.minimo_jogadores! >= 5 && (
                                <Radio value={5}>5</Radio>
                            )}
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

