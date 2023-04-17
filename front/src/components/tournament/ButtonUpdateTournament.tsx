import { gray } from "@ant-design/colors";
import { Button, DatePicker, Form, Input, Modal, Radio, Switch } from "antd";
import React, { useState } from "react";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TournamentData } from "../../datas/TournamentData";
import { getAllTournaments, updateTournament } from "../../services/tournament.service";

type Props = {
    setData: React.Dispatch<React.SetStateAction<TournamentData[]>>;
    tournamentUpdate: TournamentData;
};

export const ButtonUpdateTournament: React.FC<Props> = ({
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

    async function onSubmit(data: TournamentData) {
        if (data.date_start) {
            data.date_start = new Date(data.date_start).toISOString().slice(0, 10);
        }
        if (data.date_end) {
            data.date_end = new Date(data.date_end).toISOString().slice(0, 10);
        }

        if (!tournamentUpdate.id) return setOutput("Id não informado");

        try {
            const response = await updateTournament(tournamentUpdate.id, data);
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
                maskStyle={modalStyle}
                getContainer={false}
                footer={null}
            >
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onSubmit}
                    initialValues={{
                        id: tournamentUpdate.id,
                        name: tournamentUpdate.name,
                        local: tournamentUpdate.local,
                        type_tournament: tournamentUpdate.type_tournament,
                    }}
                >
                    <Form.Item name="id" label="ID" hidden>
                        <Input />
                    </Form.Item>

                    <Form.Item name="name" label="Nome" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="date_start" label="Data de início" rules={[{ required: true, message: "Campo obrigatório" }]} initialValue={dayjs(tournamentUpdate.date_start, dateFormat)}>
                        <DatePicker placeholder="Insira a data" />
                    </Form.Item>

                    <Form.Item name="date_end" label="Data de término" rules={[{ required: true, message: "Campo obrigatório" }]} initialValue={dayjs(tournamentUpdate.date_end, dateFormat)}>
                        <DatePicker placeholder="Insira a data" />
                    </Form.Item>

                    <Form.Item name="local" label="Local" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="type_tournament" label="Tipo do torneio" rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <Radio.Group value={"type_tournament"}>
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
                            Editar
                        </Button>
                    </Form.Item>
                </Form>
                <pre style={{ whiteSpace: "pre-line" }}>{output}</pre>
            </Modal >
        </>
    );
};
