import { gray } from "@ant-design/colors";
import { Button, DatePicker, Form, Input, Modal, Radio, Switch } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TorneioData } from "../../datas/TorneioData";
import { createTournament, getAllTournaments } from "../../servicos/TorneioServico";

type Props = {
    setData: React.Dispatch<React.SetStateAction<TorneioData[]>>;
};

export const BotaoCriarTorneio: React.FC<Props> = ({ setData: setData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [output, setOutput] = useState("");

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

        try {
            const response = await createTournament(data);
            // setOutput(JSON.stringify(response, null, 2));
            await getAllTournaments().then((TournamentData) => setData(TournamentData));
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
    }

    const modalStyle = {
        backgroundColor: gray[6],
    }

    return (
        <>
            <Button type="primary" style={{ fontSize: "12px" }} onClick={showModal}>
                Cadastrar Torneio
            </Button>
            <Modal
                title="Criar Torneio"
                open={isModalOpen}
                centered={true}
                style={modalStyle}
                onCancel={handleCancel}
                maskStyle={modalStyle}
                getContainer={false}
                footer={null}
            >
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onSubmit}
                >
                    <Form.Item name="nome" label="Nome" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="data_inicio" label="Data de início" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <DatePicker placeholder="Insira a data" />
                    </Form.Item>

                    <Form.Item name="data_final" label="Data de término" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <DatePicker placeholder="Insira a data" />
                    </Form.Item>

                    <Form.Item name="local" label="Local" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="tipo_torneio" label="Tipo do torneio" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <Radio.Group>
                            <Radio value="COPA">Copa</Radio>
                            <Radio value="ELIMINATORIA_SIMPLES">Eliminatória simples</Radio>
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