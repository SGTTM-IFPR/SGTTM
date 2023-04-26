import { gray } from "@ant-design/colors";
import { Button, DatePicker, Form, Input, Modal, Radio, Switch } from "antd";
import React, { useState } from "react";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { UsuarioData } from "../../datas/UsuarioData";
import { createUser, getAllUsers, updateUser } from "../../servicos/UsuarioServico";

type Props = {
  setData: React.Dispatch<React.SetStateAction<UsuarioData[]>>;
  userUpdate: UsuarioData;
};

export const BotaoEditarUsuario: React.FC<Props> = ({
  setData: setData,
  userUpdate: userUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [output, setOutput] = useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  dayjs.extend(customParseFormat);
  const dateFormat: string = "YYYY-MM-DD";

  const showModal = () => {
    setIsModalOpen(true);
  };

  async function onSubmit(data: UsuarioData) {
    if (data.birth_date) {
      data.birth_date = new Date(data.birth_date).toISOString().slice(0, 10);
    }
    if (!userUpdate.id) return setOutput("Id não informado");

    try {
      const response = await updateUser(userUpdate.id, data);
      // setOutput(JSON.stringify(response, null, 2));
      await getAllUsers().then((userData) => setData(userData));
      setIsModalOpen(false);
      location.reload()
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
        title="Atualizar usuário"
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
            id: userUpdate.id,
            name: userUpdate.name,
            cpf: userUpdate.cpf,
            password: userUpdate.password,
            email: userUpdate.email,
            administrator: userUpdate.administrator,
            athlete: userUpdate.athlete,
            club: userUpdate.club,
            federation: userUpdate.federation,
            sex: userUpdate.sex,
          }}
        >
          <Form.Item name="id" label="ID" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Nome" rules={[{ required: true, message: "Campo obrigatório"}]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="cpf"
            label="CPF"
            rules={[{ required: true, message: "Campo obrigatório"}, { min: 11 }, { max: 11 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Senha"
            rules={[{ required: true, message: "Campo obrigatório"}, { min: 8 }]}
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
            rules={[{ required: true, message: "Campo obrigatório"}, { type: "email", message:"Preencha com um e-mail válido"}]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="birth_date" label="Data de Nasc." rules={[{required: true, message: "Campo obrigatório"}]} initialValue={dayjs(userUpdate.birth_date, dateFormat)}>
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            name="administrator"
            label="Administrador"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item name="athlete" label="Atleta" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="club" label="Clube">
            <Input />
          </Form.Item>
          <Form.Item name="federation" label="Federação">
            <Input />
          </Form.Item>
          <Form.Item name="sex" label="Sexo" rules={[{required: true, message: "Campo obrigatório"}]}>
            <Radio.Group>
              <Radio value="MALE">Masculino</Radio>
              <Radio value="FEMALE">Feminino</Radio>
              <Radio value="OTHERS">Outro</Radio>
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
      </Modal>
    </>
  );
};
