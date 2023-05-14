import { Button, Form, Modal, Radio } from "antd";
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
};


export const BotaoCriarGrupo: React.FC<Props> = ({
    idTournament: idTournament,
    torneioData = {} as TorneioData,
    onCreateGrupo,
    quantidade_inscritos
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
        const grupos = await getNumeroClassificados(quantidade_inscritos!.valueOf());
        setGrupos(grupos);
        setVisible(true);
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        const newValues = { ...formValues, ...values };
        criarGrupo(newValues.formato, newValues.quantidade_classificados);
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

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
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    form={form}
                    >
                    <Form.Item  name="formato" label="Formato" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <Radio.Group>
                            <Radio value="RANKING">Ordem de RANKING</Radio>
                            <Radio value="ALEATORIO">Sorteio</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {grupos?.minimo_jogadores! >= 4 && (
                        <Form.Item
                            name="quantidade_classificados"
                            label="Classificações"
                            rules={[{ required: true, message: "Campo obrigatório" }]}
                        >
                            <Radio.Group>
                                <Radio value={2}>Dois</Radio>
                                <Radio value={3}>Três</Radio>
                            </Radio.Group>
                        </Form.Item>
                    )}
                </Form>
            </Modal>
        </>
    );
};

