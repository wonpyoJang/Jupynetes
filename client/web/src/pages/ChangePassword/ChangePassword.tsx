import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Button, Modal, Form, Input } from 'antd';
import CSS from 'csstype';
import Password from 'antd/lib/input/Password';
import { UserRepository } from '../../api/user/UserRepository';

const changePasswordButtonStyle: CSS.Properties = {
  backgroundColor: 'rgba(255, 255, 255, 1)',
  border: 'solid',
  borderColor: 'rgba(78, 185, 242,1)',
};

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 12,
  },
};

const onFinishFailed = () => {};

const ChangePassword = (props: any) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');
  const [username, setUsername] = React.useState('');
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = React.useState('');

  const changeUsernameHandler = (event: any) => {
    console.log('event.target.value : ' + event.target.value);
    setUsername(event.target.value);
    console.log('username: ' + username);
  };

  const changeCurrentPasswordHandler = (event: any) => {
    console.log('event.target.value : ' + event.target.value);
    setCurrentPassword(event.target.value);
    console.log('currentPassword: ' + currentPassword);
  };

  const changeNewPasswordHandler = (event: any) => {
    console.log('event.target.value : ' + event.target.value);
    setNewPassword(event.target.value);
    console.log('newPassword: ' + newPassword);
  };

  const changeNewPasswordConfirmHandler = (event: any) => {
    console.log('event.target.value : ' + event.target.value);
    setNewPasswordConfirm(event.target.value);
    console.log('newPasswordConfirm: ' + newPasswordConfirm);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    console.log('newPasswrd: ' + newPassword);
    console.log('newPasswordConfirm: ' + newPasswordConfirm);
    if (newPassword !== newPasswordConfirm) {
      alert('새 패스워드와 새 패스워드 확인이 일치하지 않습니다.');
      return;
    }

    let userRepository = new UserRepository();

    let result = userRepository.postUser(currentPassword, newPassword);

    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
    return result;
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  console.log('change password username : ' + props.username);

  return (
    <div>
      <Button style={changePasswordButtonStyle} onClick={showModal}>
        비밀번호수정
      </Button>
      <Modal
        title="비밀번호 수정"
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
        >
          <Form.Item
            label="아이디"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input
              disabled={true}
              onChange={changeUsernameHandler}
              defaultValue={props.username}
            />
          </Form.Item>
          <Form.Item
            label="기존 비밀번호"
            name="passwordOriginal"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password onChange={changeCurrentPasswordHandler} />
          </Form.Item>
          <Form.Item
            label="변경할 비밀번호"
            name="passwordNew"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password onChange={changeNewPasswordHandler} />
          </Form.Item>
          <Form.Item
            label="비밀번호 재입력"
            name="passwordRetype"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password onChange={changeNewPasswordConfirmHandler} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ChangePassword;
