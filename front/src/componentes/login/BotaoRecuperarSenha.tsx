import { gray } from "@ant-design/colors";
import { Button, DatePicker, Form, Input, Modal, message } from "antd";
import { useState } from "react";
import { getUserByCpf, recuperar_senha } from "../../servicos/UsuarioServico";
import { LoadingOutlined } from "@ant-design/icons";
import { cpf } from 'cpf-cnpj-validator';
import { get } from "react-hook-form";

export const BotaoRecuperarSenha = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [cpfValido, setCpfValido] = useState(false);

    const handleCPFChange = (e: { target: { value: string; }; }) => {
        const cpf_inserido = e.target.value.replace(/[^\d]/g, ""); // remove caracteres não numéricos
        setCpfValido(cpf.isValid(cpf_inserido));
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    async function onSubmit(values: any) {
        const email = values.email;
        const cpf = values.cpf;
        const data_de_nascimento = new Date(values.data_de_nascimento).toISOString().slice(0, 10);
        setIsLoading(true);
        try {
            const usuario = await getUserByCpf(cpf);
            if (!usuario || usuario.email !== email || usuario.data_de_nascimento !== data_de_nascimento) {
                message.error('Dados incorretos!');
                setIsLoading(false);
                return;
            }
            const response = await recuperar_senha(email);
            handleCancel();
            message.success('E-mail enviado com sucesso!');
        } catch (error) {
            console.error(error);
            // setOutput(JSON.stringify(error, null, 2));
            message.error('Erro ao enviar e-mail!');
        }
        setIsLoading(false);
    }


    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const modalStyle = {
        backgroundColor: gray[6],
    }

    return (
        <>
            <Button type="primary" style={{ marginTop: "10px", fontSize: "12px", background: "#ffc107", border: 'none', fontWeight: 'bold', fontSizeAdjust: '0.8em', cursor: 'pointer' }} onClick={showModal}>
                Recuperar senha
            </Button >
            <Modal
                title="Recuperar Senha"
                open={isModalOpen}
                centered={true}
                style={modalStyle}
                onCancel={handleCancel}
                getContainer={false}
                footer={null}
            >
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onSubmit}
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[{ required: true, message: "Campo obrigatório" }, { type: "email", message: "Preencha com um e-mail válido" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="cpf"
                        label="CPF"
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input onChange={handleCPFChange} />
                    </Form.Item>

                    <Form.Item name="data_de_nascimento" label="Data de Nasc." rules={[{ required: true, message: "Campo obrigatório" }]}>
                        <DatePicker placeholder="Insira a data" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            style={{ backgroundColor: "green-6", height: 40 }}
                            type="primary"
                            htmlType="submit"
                            icon={isLoading ? <LoadingOutlined /> : null}
                            disabled={isLoading || !cpfValido}
                        >
                            Recuperar Senha
                        </Button>
                    </Form.Item>

                </Form>
                <pre style={{ whiteSpace: 'pre-line' }}>{output}</pre>
            </Modal>

        </>
    );
};