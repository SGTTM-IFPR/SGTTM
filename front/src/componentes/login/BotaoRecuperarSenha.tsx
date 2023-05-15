import { gray } from "@ant-design/colors";
import { Button, Form, Input, Modal, message } from "antd";
import { useState } from "react";
import { recuperar_senha } from "../../servicos/LoginService";

export const BotaoRecuperarSenha = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [output, setOutput] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
    };

    async function onSubmit(values: any) {
        const email = values.email;
        try {
            // const response = await recuperar_senha(email);
            console.log(email);
            message.success('E-mail enviado com sucesso!');
            message.success('Verifique sua caixa de entrada!');
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
            <Button type="primary" style={{ marginLeft: "10px", fontSize: "12px", background: "#ffc107", border: 'none', fontWeight: 'bold', fontSizeAdjust: '0.8em', cursor: 'pointer' }} onClick={showModal}>
                Recuperar senha
            </Button>
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

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            style={{ backgroundColor: "green-6", height: 40 }}
                            type="primary"
                            htmlType="submit"
                        >
                            Recuperar Senha
                        </Button>
                    </Form.Item>

                </Form>
                <pre style={{ whiteSpace: 'pre-line' }}>{output}</pre>
            </Modal >
        </>
    );
};