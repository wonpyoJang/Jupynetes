import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Button, Modal, Form, Input, InputNumber } from 'antd';
import CSS from 'csstype';
import { ServerRepository } from '../../api/server/ServerRepository';
import appState from '../../AppState';

const mypageStyle: CSS.Properties = {
  margin: '1rem',
  float: 'right',
};

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

const onFinish = (values: String) => {
  console.log('Success:', values);
};

const onFinishFailed = () => {};

const CreateInstance = () => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');
  const [serverName, setServerName] = React.useState('');
  const [serverDesc, setServerDesc] = React.useState('');
  const [allocatedCPU, setAllocatedCPU] = React.useState(0);
  const [allocatedMem, setAllocatedMem] = React.useState(0);
  const [allocatedGpu, setAllocatedGpu] = React.useState(0);

  const changeServerNameHandler = (event: any) => {
    console.log('event.target.value : ' + event.target.value);
    setServerName(event.target.value);
    console.log('serverName: ' + serverName);
  };

  const changeServerDescHandler = (event: any) => {
    console.log('event.target.value : ' + event.target.value);
    setServerDesc(event.target.value);
    console.log('serverDesc: ' + serverDesc);
  };

  const changeAllocatedCpuHandler = (event: any) => {
    console.log('event.target.value : ' + event);
    setAllocatedCPU(event);
    console.log('allocatedCpu: ' + allocatedCPU);
  };

  const changeAllocatedMemHandler = (event: any) => {
    console.log('event.target.value : ' + event);
    setAllocatedMem(event);
    console.log('allocatedMem: ' + allocatedMem);
  };

  const changeAllocatedGpuHandler = (event: any) => {
    console.log('event.target.value : ' + event);
    setAllocatedGpu(event);
    console.log('allocatedMem: ' + allocatedGpu);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    let newServerObject = {
      name: serverName,
      description: serverDesc,
      template_id: 4,
      template_variables: [
        {
          name: 'good',
          value: 'world',
        },
      ],
      flavor: {
        cpu: allocatedCPU,
        memory: allocatedMem,
        nvidia_gpu: 100,
      },
    };

    let serverRepository = new ServerRepository();

    let result = await serverRepository.postServer(newServerObject);

    setServerName('');
    setServerDesc('');
    setAllocatedCPU(0);
    setAllocatedGpu(0);
    setAllocatedMem(0);
    setConfirmLoading(true);
    if (result !== undefined) {
      appState.addServer(result);
    }

    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <>
      <Button danger style={mypageStyle} onClick={showModal}>
        인스턴스생성
      </Button>
      <Modal
        title="인스턴스 생성"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="서버이름"
            name="servername"
            rules={[
              {
                required: true,
                message: '서버명을 입력해 주세요.',
              },
            ]}
          >
            <Input onChange={changeServerNameHandler} />
          </Form.Item>
          <Form.Item
            label="서버설명"
            name="description"
            rules={[
              {
                required: true,
                message: '간단한 설명을 입력해 주세요.',
              },
            ]}
          >
            <Input onChange={changeServerDescHandler} />
          </Form.Item>
          <Form.Item
            label="nCPU"
            name="nCPU"
            rules={[
              {
                required: true,
                message: 'CPU 사양을 입력해 주세요.',
              },
            ]}
          >
            <InputNumber onChange={changeAllocatedCpuHandler} />
          </Form.Item>
          <Form.Item
            label="Mem"
            name="Mem"
            rules={[
              {
                required: true,
                message: 'Mem 사양을 입력해 주세요.',
              },
            ]}
          >
            <InputNumber onChange={changeAllocatedMemHandler} />
          </Form.Item>
          <Form.Item
            label="nvidia_gpu"
            name="nvidia_gpu"
            rules={[
              {
                required: true,
                message: 'nvidia_gpu 사양을 입력해 주세요.',
              },
            ]}
          >
            <InputNumber onChange={changeAllocatedGpuHandler} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateInstance;
