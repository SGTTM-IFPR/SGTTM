import { gray } from "@ant-design/colors";
import { Button, DatePicker, Form, Input, Modal, Radio, Switch, message } from "antd";
import React, { useState } from "react";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { UsuarioData } from "../../datas/UsuarioData";
import { createUser, getAllUsers, updateUser } from "../../servicos/UsuarioServico";
import { cpf } from 'cpf-cnpj-validator';
import { UserOutlined } from "@ant-design/icons";
import locale from 'antd/es/date-picker/locale/pt_BR';
import type { RangePickerProps } from 'antd/es/date-picker';

dayjs.extend(customParseFormat);

type Props = {
  setData: React.Dispatch<React.SetStateAction<UsuarioData[]>>;
  userUpdate: UsuarioData;
};

export const BotaoEditarUsuarioLogado: React.FC<Props> = ({
  setData: setData,
  userUpdate: userUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [output, setOutput] = useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  dayjs.extend(customParseFormat);
  const dateFormat: string = "YYYY-MM-DD";
  const [cpfValido, setCpfValido] = useState(true);

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    const today = dayjs();
    const tenYearsAgo = today.subtract(10, 'year').startOf('day');
    return current && current > tenYearsAgo;
  };

  const handleCPFChange = (e: { target: { value: string } }) => {
    const cpf_inserido = e.target.value; // remove caracteres não numéricos
    setCpfValido(cpf.isValid(cpf_inserido));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  async function onSubmit(data: UsuarioData) {
    if (data.data_de_nascimento) {
      data.data_de_nascimento = new Date(data.data_de_nascimento).toISOString().slice(0, 10);
    }
    if (!userUpdate.id) return setOutput("Id não informado");

    try {
      const response = await updateUser(userUpdate.id, data);
      message.success('Dados atualizado com sucesso!');
      setIsModalOpen(false);
    } catch (error) {
      message.error('Erro ao atualizar dados!');
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
        size="middle"
        // type="primary"
        // shape="round"
        style={{
          marginRight: 8,
          background: "#1890ff",
          borderColor: "#1890ff",
          color: "#fff",
        }}
        onClick={showModal}
        icon={<UserOutlined />}
      >
        Meu Perfil
      </Button>
      <Modal
        title="Meu Perfil"
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
            id: userUpdate.id,
            nome: userUpdate.nome,
            cpf: userUpdate.cpf,
            email: userUpdate.email,
            administrador: userUpdate.administrador,
            atleta: userUpdate.atleta,
            clube: userUpdate.clube,
            federacao: userUpdate.federacao,
            sexo: userUpdate.sexo,
          }}
        >
          <Form.Item name="id" label="ID" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="nome" label="Nome" rules={[{ required: true, message: "Campo obrigatório" }]}>
            <Input />
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
          <Form.Item name="data_de_nascimento" label="Data de Nasc." rules={[{ required: true, message: "Campo obrigatório" }]} initialValue={dayjs(userUpdate.data_de_nascimento, dateFormat)}>
            <DatePicker placeholder="Insira a data" format={"DD/MM/YYYY"} locale={locale} disabledDate={disabledDate}/>
          </Form.Item>
          {/* <Form.Item
            name="administrador"
            label="Administrador"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item name="atleta" label="Atleta" valuePropName="checked">
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
              <Radio value="Masculino">Masculino</Radio>
              <Radio value="Feminino">Feminino</Radio>
              <Radio value="Outros">Outro</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              style={{ backgroundColor: "green-6", height: 40 }}
              type="primary"
              htmlType="submit"
              disabled={!cpfValido}
            >
              Salvar
            </Button>
          </Form.Item>
        </Form>
        <pre style={{ whiteSpace: "pre-line" }}>{output}</pre>
      </Modal>
    </>
  );
};
