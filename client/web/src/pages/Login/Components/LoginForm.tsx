import { useState } from 'react';
import { Typography, Form, Input, Button, Spin } from 'antd';
import { useHistory } from 'react-router-dom';

import { UserRepository } from '../../../api/user/UserRepository';

const styles = require('./LoginForm.css');

const { Title } = Typography;
const layout = {};

const LoginForm = (props: any) => {
  const history = useHistory();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
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
        setIsLoading(false);
        return;
      }
      console.log('hey');
      console.log(userInfo);
      history.push({
        pathname: '/dashboard',
        state: { userId: userId },
      });
    }
    setIsLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className="background">
        <Spin spinning={isLoading} tip="접속 중...">
          <div className="loginScreen">
            <div className="title">
              <div className="titleText">JUPYNETES</div>
            </div>
            <div className="loginForm">
              <Form
                {...layout}
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item className="userNameForm" name="username">
                  <Input
                    className="userNameInput"
                    autoFocus
                    type="text"
                    placeholder="아이디"
                    onChange={changeUserIdHandler}
                  />
                </Form.Item>
                <Form.Item className="passwordForm" name="password">
                  <Input.Password
                    type="text"
                    placeholder="패스워드"
                    onChange={changePasswordHandler}
                    className="passwordInput"
                  />
                </Form.Item>
                <Form.Item className="submitButtonArea">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="submitButton"
                  >
                    로그인
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className="footer">
              <p className="footerText">
                문의 : temp@uos.ac.kr / 010-0000-0000
              </p>
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default LoginForm;
