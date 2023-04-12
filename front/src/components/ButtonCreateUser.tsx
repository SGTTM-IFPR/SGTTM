import { gray } from "@ant-design/colors";
import { Button, DatePicker, Form, Input, Modal, Radio, Switch } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserData } from "../datas/UserData";
import { createUser } from "../services/user.service";
/**
 * To-ddo
 * 
 * [] Validate the form
 * [] Field arrays 
 * [] Upload de arquivos
 * [] Composition Patterns 
 * @returns 
 */

const createUserFormSchema = z.object({
    name: z.string()
    .nonempty('nome nao pode ser vazio')
    .min(3,"")
    .max(100)
    ,
    CPF: z.string().min(11).max(11)
    .nonempty('CPF nao pode ser vazio'),
    password: z.string().min(8).max(100)
    .nonempty('Senha nao pode ser vazia'),
    club: z.string(),
    federation: z.string(),
    sex : z.enum(['Masculino' || 'Feminino' || 'Outro']),
    email: z.string().email()
    .nonempty('Email nao pode ser vazio')
})

export const ButtonCreateUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [output, setOutput] = useState("");
  const { register, 
    handleSubmit, 
    formState: {errors} } = useForm({
    resolver: zodResolver(createUserFormSchema),
  });
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function onSubmit(data: UserData) {
    setOutput(JSON.stringify(data, null, 2));
    console.log(data);
    const teste = createUser(data);
    console.log(teste);
    if (data) {
      setIsModalOpen(false);
    }
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
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
        style={modalStyle}
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
              <Radio value="Masculino">Masculino</Radio>
              <Radio value="Feminino">Feminino</Radio>
              <Radio value="Outro">Outro</Radio>
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
        <pre>{output}</pre>
      </Modal>
    </>
  );
};
