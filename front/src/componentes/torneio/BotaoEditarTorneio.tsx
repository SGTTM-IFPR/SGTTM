import { gray } from "@ant-design/colors";
import { Button, DatePicker, Form, Input, Modal, Radio, Switch, message } from "antd";
import React, { useState } from "react";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TorneioData } from "../../datas/TorneioData";
import { getAllTournaments, updateTournament } from "../../servicos/TorneioServico";

type Props = {
    setData: React.Dispatch<React.SetStateAction<TorneioData[]>>;
    tournamentUpdate: TorneioData;
};

export const BotaoEditarTorneio: React.FC<Props> = ({
    setData: setData,
    tournamentUpdate: tournamentUpdate,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [output, setOutput] = useState("");
    dayjs.extend(customParseFormat);
    const dateFormat = "YYYY-MM-DD";

    const showModal = () => {
        setIsModalOpen(true);
    };

    async function onSubmit(data: TorneioData) {
        if (data.data_inicio) {
            data.data_inicio = new Date(data.data_inicio).toISOString().slice(0, 10);
        }
        if (data.data_final) {
            data.data_final = new Date(data.data_final).toISOString().slice(0, 10);
        }

        switch (data.tipo_torneio) {
            case "Copa":
                data.tipo_torneio = "COPA";
                break;
            case "Eliminatória simples":
                data.tipo_torneio = "ELIMINATORIA_SIMPLES";
                break;
            case "Rodízio Simples":
                data.tipo_torneio = "RODIZIO_SIMPLES";
                break;
        }

        if (!tournamentUpdate.id) return setOutput("Id não informado");

        try {
            const response = await updateTournament(tournamentUpdate.id, data);
            // setOutput(JSON.stringify(response, null, 2));
            await getAllTournaments().then((TournamentData) => setData(TournamentData));
            setIsModalOpen(false);
            message.success('Torneio atualizado com sucesso!');
        } catch (error) {
            message.error('Erro ao atualizar torneio!');
            setIsModalOpen(false);
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const modalStyle = {
        backgroundColor: gray[6],
    };

    return (
        <>
            <Button
                size="small"
                type="primary"
                style={{ marginRight: 8, background: "blue" }}
                onClick={showModal}
            >
                Editar
            </Button>
            <Modal
                title="Atualizar Torneio"
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
                    initialValues={{
                        id: tournamentUpdate.id,
                        nome: tournamentUpdate.nome,
                        local: tournamentUpdate.local,
                        tipo_torneio: tournamentUpdate.tipo_torneio,
                    }}
                >
                    <Form.Item name="id" label="ID" hidden>
                        <Input />
                    </Form.Item>

                    <Form.Item name="nome" label="Nome" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="data_inicio" label="Data de início" rules={[{ required: true, message: "Campo obrigatório" }]} initialValue={dayjs(tournamentUpdate.data_inicio, dateFormat)}>
                        <DatePicker placeholder="Insira a data" />
                    </Form.Item>

                    <Form.Item name="data_final" label="Data de término" rules={[{ required: true, message: "Campo obrigatório" }]} initialValue={dayjs(tournamentUpdate.data_final, dateFormat)}>
                        <DatePicker placeholder="Insira a data" />
                    </Form.Item>

                    <Form.Item name="local" label="Local" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="tipo_torneio" label="Tipo do torneio" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <Radio.Group value={"tipo_torneio"}>
                            <Radio value="Copa">Copa</Radio>
                            <Radio value="Eliminatória simples">Eliminatória Simples</Radio>
                            <Radio value="Rodízio Simples">Rodízio Simples</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            style={{ backgroundColor: "green-6", height: 40 }}
                            type="primary"
                            htmlType="submit"
                        >
                            Editar
                        </Button>
                    </Form.Item>
                </Form>
                <pre style={{ whiteSpace: "pre-line" }}>{output}</pre>
            </Modal >
        </>
    );
};
