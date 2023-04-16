import { gray } from "@ant-design/colors";
import { Button, DatePicker, Form, Input, Modal, Radio, Switch } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TournamentData } from "../../datas/TournamentData";
import { createTournament, getAllTournaments } from "../../services/tournament.service";

type Props = {
    setData: React.Dispatch<React.SetStateAction<TournamentData[]>>;
};

export const ButtonCreateTournament: React.FC<Props> = ({ setData: setData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [output, setOutput] = useState("");

    const showModal = () => {
        setIsModalOpen(true);
    };

    async function onSubmit(data: TournamentData) {
        if (data.date_start) {
            data.date_start = new Date(data.date_start).toISOString().slice(0, 10);
        }
        if (data.date_end) {
            data.date_end = new Date(data.date_end).toISOString().slice(0, 10);
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
                    <Form.Item name="name" label="Nome" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="date_start" label="Data de início" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <DatePicker placeholder="Insira a data" />
                    </Form.Item>

                    <Form.Item name="date_end" label="Data de término" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <DatePicker placeholder="Insira a data" />
                    </Form.Item>

                    <Form.Item name="local" label="Local" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="type_tournament" label="Tipo do torneio" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <Radio.Group>
                            <Radio value="COUP">Copa</Radio>
                            <Radio value="SINGLE_ELIMINATION">Eliminatória simples</Radio>
                            <Radio value="ROUND_ROBIN">Rodízio Simples</Radio>
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