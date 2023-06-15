import { gray } from "@ant-design/colors";
import { Button, DatePicker, Form, Input, Modal, Radio, message } from "antd";
import React, { useState } from "react";
import { TorneioData } from "../../datas/TorneioData";
import { createTournament, getAllTournaments } from "../../servicos/TorneioServico";
import locale from 'antd/es/date-picker/locale/pt_BR';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

type Props = {
    setData: React.Dispatch<React.SetStateAction<TorneioData[]>>;
};

export const BotaoCriarTorneio: React.FC<Props> = ({ setData: setData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [output, setOutput] = useState("");
    const [torneios, setTorneios] = useState<TorneioData[]>([]);
    const [isNomeDuplicado, setIsNomeDuplicado] = useState(false);
    const [nomeDuplicado, setNomeDuplicado] = useState("");


    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        return current && current < dayjs().startOf('day');
    };

    const showModal = async () => {
        try {
            const tournaments = await getAllTournaments();
            setTorneios(tournaments);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Erro ao obter os torneios", error);
        }
    };


    async function onSubmit(data: TorneioData) {
        if (data.data_inicio) {
            data.data_inicio = new Date(data.data_inicio).toISOString().slice(0, 10);
        }
        if (data.data_final) {
            data.data_final = new Date(data.data_final).toISOString().slice(0, 10);
        }

        try {
            const response = await createTournament(data);
            // setOutput(JSON.stringify(response, null, 2));
            await getAllTournaments().then((TournamentData) => setData(TournamentData));
            setIsModalOpen(false);
            message.success('Torneio criado com sucesso!');
        } catch (error) {
            message.error('Erro ao criar torneio!');
            setIsModalOpen(false);
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const modalStyle = {
        backgroundColor: gray[6],
    }
    const validateNome = (_: any, value: React.SetStateAction<string> | undefined) => {
        if (value && torneios.some((torneio) => torneio.nome === value)) {
            setIsNomeDuplicado(true);
            setNomeDuplicado(value);
            return Promise.reject("Esse nome já está em uso por outro torneio");
        }
        setIsNomeDuplicado(false);
        return Promise.resolve();
    };


    return (
        <>
            <Button type="primary" style={{ fontSize: "12px" }} onClick={showModal}>
                Cadastrar
            </Button>
            <Modal
                title="Criar Torneio"
                open={isModalOpen}
                centered={true}
                style={modalStyle}
                onCancel={handleCancel}
                // maskStyle={modalStyle}
                getContainer={false}
                footer={null}
            >
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onSubmit}
                >
                    <Form.Item name="nome" label="Nome" rules={[{ required: true, message: "Campo obrigatório" }, { validator: validateNome }]} validateStatus={isNomeDuplicado ? "error" : ""}
                        help={isNomeDuplicado ? `O nome '${nomeDuplicado}' já está em uso por outro torneio` : ""}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="data_inicio" label="Data de início" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <DatePicker placeholder="Insira a data" format={"DD/MM/YYYY"} locale={locale} disabledDate={disabledDate} />
                    </Form.Item>

                    <Form.Item name="data_final" label="Data de término" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <DatePicker placeholder="Insira a data" format={"DD/MM/YYYY"} locale={locale} disabledDate={disabledDate} />
                    </Form.Item>

                    <Form.Item name="local" label="Local" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="tipo_torneio" label="Tipo do torneio" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <Radio.Group>
                            <Radio value="COPA">Copa</Radio>
                            <Radio value="ELIMINATORIA_SIMPLES">Eliminatória Simples</Radio>
                            <Radio value="RODIZIO_SIMPLES">Rodízio Simples</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            style={{ backgroundColor: "green-6", height: 40 }}
                            type="primary"
                            htmlType="submit"
                        >
                            Criar Torneio
                        </Button>
                    </Form.Item>

                </Form>
                <pre style={{ whiteSpace: 'pre-line' }}>{output}</pre>
            </Modal >
        </>
    );
};