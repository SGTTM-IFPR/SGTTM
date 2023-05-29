import { gray } from "@ant-design/colors";
import { Button, DatePicker, Form, Input, Modal, Radio, Switch, message } from "antd";
import React, { useState } from "react";
import { UsuarioData } from "../../datas/UsuarioData";
import { createUser, getAllUsers } from "../../servicos/UsuarioServico";
import { cpf } from 'cpf-cnpj-validator';
import locale from 'antd/es/date-picker/locale/pt_BR';

type Props = {
  setData: React.Dispatch<React.SetStateAction<UsuarioData[]>>;
  local: string;
};

export const BotaoCriarUsuario: React.FC<Props> = ({ setData: setData, local: local }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [output, setOutput] = useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [cpfValido, setCpfValido] = useState(false);

  const handleCPFChange = (e: { target: { value: string; }; }) => {
    const cpf_inserido = e.target.value.replace(/[^\d]/g, ""); // remove caracteres não numéricos
    setCpfValido(cpf.isValid(cpf_inserido));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  async function onSubmit(data: UsuarioData) {
    if (data.data_de_nascimento) {
      data.data_de_nascimento = new Date(data.data_de_nascimento).toISOString().slice(0, 10);
    }

    try {
      data.administrador = false;
      data.atleta = true;
      const response = await createUser(data);
      if (local !== "login") {
        // setOutput(JSON.stringify(response, null, 2));
        await getAllUsers().then((userData) => setData(userData));
      }
      message.success('Usuário criado com sucesso!');
      setIsModalOpen(false);
    } catch (error) {
      message.error('Erro ao criar usuário!');
      setIsModalOpen(false);
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
        Cadastrar
      </Button>
      <Modal
        title="Cadastrar usuário"
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
          <Form.Item name="nome" label="Nome" rules={[{ required: true, message: "Campo obrigatório" }]}>
            <Input onChange={handleCPFChange} />
          </Form.Item>
          <Form.Item
            name="cpf"
            label="CPF"
            rules={[{ required: true, message: "Campo obrigatório" }, { min: 11 }, { max: 11 }]}
          >
            <Input onChange={handleCPFChange} />
          </Form.Item>
          <Form.Item
            name="senha"
            label="Senha"
            rules={[{ required: true, message: "Campo obrigatório" }, { min: 8 }]}
          >
            <Input.Password
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[{ required: true, message: "Campo obrigatório" }, { type: "email", message: "Preencha com um e-mail válido" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="data_de_nascimento" label="Data de Nasc." rules={[{ required: true, message: "Campo obrigatório" }]}>
            <DatePicker placeholder="Insira a data" format={"DD/MM/YYYY"} locale={locale} />
          </Form.Item>
          {/* <Form.Item
            name="administrador"
            label="Administrador"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item> */}
          {/* <Form.Item name="atleta" label="Atleta" valuePropName="checked">
            <Switch />
          </Form.Item> */}
          <Form.Item name="clube" label="Clube">
            <Input />
          </Form.Item>
          <Form.Item name="federacao" label="Federação">
            <Input />
          </Form.Item>
          <Form.Item name="sexo" label="Sexo" rules={[{ required: true, message: "Campo obrigatório" }]}>
            <Radio.Group>
              <Radio value="MASCULINO">Masculino</Radio>
              <Radio value="FEMININO">Feminino</Radio>
              <Radio value="OUTROS">Outro</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              style={{ backgroundColor: "green-6", height: 40 }}
              type="primary"
              htmlType="submit"
              disabled={!cpfValido}
            >
              Cadastrar
            </Button>
          </Form.Item>
        </Form>
        <pre style={{ whiteSpace: 'pre-line' }}>{output}</pre>
      </Modal>
    </>
  );
};
