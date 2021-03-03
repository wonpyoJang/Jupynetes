import { useState } from 'react';
import { Typography, Form, Input, Button, Space } from 'antd';
import { useHistory } from 'react-router-dom';

import { UserRepository } from '../../../api/user/UserRepository';

const styles = require('./LoginForm.css');

const { Title } = Typography;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};

const LoginForm = (props: any) => {
  const history = useHistory();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const changeUserIdHandler = (event: any) => {
    console.log('event.target.value : ' + event.target.value);
    setUserId(event.target.value);
    console.log('userId: ' + userId);
  };

  const changePasswordHandler = (event: any) => {
    console.log('event.target.value : ' + event.target.value);
    setPassword(event.target.value);
    console.log('password: ' + password);
  };

  const onFinish = async (values: any) => {
    console.log('Success:', values);

    let repository = new UserRepository();
    console.log('userId: ' + userId);
    console.log('password: ' + password);
    let response = await repository.postLogin(userId, password);
    if (response === undefined) {
    } else {
      let userInfo = await repository.getUser();
      if (userInfo !== undefined) {
      } else {
        alert('로그인에 실패했습니다.');
        return;
      }
      console.log('hey');
      console.log(userInfo);
      history.push({
        pathname: '/dashboard',
        state: { userId: userId },
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Space align="center">
        <div></div>
        <div className="loginForm">
          <Space align="start">
            <Title className="title">JUPYNETES</Title>
          </Space>
          <div></div>
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
              className="userNameForm"
              name="username"
              rules={[
                {
                  required: true,
                  message: '아이디를 입력해 주세요!',
                },
              ]}
            >
              <Input
                className="userNameInput"
                autoFocus
                type="text"
                placeholder="아이디"
                onChange={changeUserIdHandler}
              />
            </Form.Item>
            <Space align="start">
              <Form.Item
                className="passwordForm"
                name="password"
                rules={[
                  {
                    required: true,
                    message: '패스워드를 입력해 주세요!',
                  },
                ]}
              >
                <Input.Password
                  type="text"
                  placeholder="패스워드"
                  onChange={changePasswordHandler}
                  className="passwordInput"
                />
              </Form.Item>
            </Space>
            <div></div>
            <Form.Item className="submitButtonArea">
              <Button type="primary" htmlType="submit" className="submitButton">
                로그인
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Space>
    </>
  );
};

export default LoginForm;
