import { gray } from "@ant-design/colors";
import { Button, DatePicker, Form, Input, Modal, Radio, Switch } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserData } from "../datas/UserData";
import { createUser, getAllUsers, updateUser } from "../services/user.service";

type Props = {
  setData: React.Dispatch<React.SetStateAction<UserData[]>>;
  userUpdate: UserData;
};

export const ButtonUpdateUser: React.FC<Props> = ({
  setData: setData,
  userUpdate: userUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [output, setOutput] = useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const dateFormat: string = "DD-MM-YYYY";

  const showModal = () => {
    setIsModalOpen(true);
  };

  async function onSubmit(data: UserData) {
    if (data.birth_date) {
      data.birth_date = new Date(data.birth_date).toISOString().slice(0, 10);
    }
    if (!userUpdate.id) return setOutput("Id não informado");

    try {
      const response = await updateUser(userUpdate.id, data);
      setOutput(JSON.stringify(response, null, 2));
      await getAllUsers().then((userData) => setData(userData));
    } catch (error) {
      console.error(error);
      setOutput(JSON.stringify(error, null, 2));
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
        update
      </Button>
      <Modal
        title="Atualizar usuario"
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
          <Form.Item name="id" label="Id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="cpf"
            label="CPF"
            rules={[{ required: true }, { min: 11 }, { max: 11 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }, { min: 8 }]}
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
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="birth_date" label="Birth Date">
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            name="administrator"
            label="Administrator"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item name="athlete" label="Athlete" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="club" label="Club">
            <Input />
          </Form.Item>
          <Form.Item name="federation" label="Federation">
            <Input />
          </Form.Item>
          <Form.Item name="sex" label="Sex">
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
              Submit
            </Button>
          </Form.Item>
        </Form>
        <pre style={{ whiteSpace: "pre-line" }}>{output}</pre>
      </Modal>
    </>
  );
};
