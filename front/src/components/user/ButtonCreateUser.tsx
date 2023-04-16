import { gray } from "@ant-design/colors";
import { Button, DatePicker, Form, Input, Modal, Radio, Switch } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserData } from "../../datas/UserData";
import { createUser, getAllUsers } from "../../services/user.service";


type Props = {
  setData: React.Dispatch<React.SetStateAction<UserData[]>>;
};

export const ButtonCreateUser: React.FC<Props> = ({ setData: setData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [output, setOutput] = useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  async function onSubmit(data: UserData) {
    if (data.birth_date) {
      data.birth_date = new Date(data.birth_date).toISOString().slice(0, 10);
    }

    try {
      const response = await createUser(data);
      setOutput(JSON.stringify(response, null, 2));
      await getAllUsers().then((userData) => setData(userData));
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
        Cadastrar usuario
      </Button>
      <Modal
        title="Criar Usuario"
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
            <DatePicker />
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
        <pre style={{ whiteSpace: 'pre-line' }}>{output}</pre>
      </Modal>
    </>
  );
};
