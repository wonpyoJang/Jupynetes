import React, { Component, useState } from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { Button, Modal, Form, Input, Spin } from 'antd';
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
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    if (newPassword !== newPasswordConfirm) {
      alert('새 패스워드와 새 패스워드 확인이 일치하지 않습니다.');
      setIsLoading(false);
      return;
    }

    if (newPassword === props.username) {
      alert('아이디와 패스워드는 일치할 수 없습니다.');
      setIsLoading(false);
      return;
    }

    if (newPassword === currentPassword) {
      alert('새 패스워드는 기존 패스워드와 같을 수 없습니다.');
      setIsLoading(false);
      return;
    }

    let userRepository = new UserRepository();
    let result = userRepository.postUser(currentPassword, newPassword);

    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      setIsLoading(false);
    }, 2000);
    return result;
  };

  const handleCancel = () => {
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
        <Spin spinning={isLoading} tip="요청 중...">
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
                  message: '기존 비밀번호를 입력해 주세요!',
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
                  message: '변경할 비밀번호를 입력해 주세요.',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('passwordOriginal') !== value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error('기존 비밀번호는 사용할 수 없습니다.'),
                    );
                  },
                }),
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || props.username !== value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error('아이디와 비밀번호는 동일할 수 없습니다.'),
                    );
                  },
                }),
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
                  message: '일치하지 않습니다.',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('passwordNew') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('일치하지 않습니다.'));
                  },
                }),
              ]}
            >
              <Input.Password onChange={changeNewPasswordConfirmHandler} />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default ChangePassword;
