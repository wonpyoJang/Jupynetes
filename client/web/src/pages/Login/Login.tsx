import 'antd/dist/antd.css';
import '../../index.css';
import './Login.css';

import { Typography, Layout, Space } from 'antd';
import LoginForm from './Components/LoginForm';

const { Title } = Typography;

const Login = () => {
  const children = [
    <Title className="Title">
      <h1 className="Title">Jupynetes</h1>
    </Title>,
    <div style={{ height: '3rem' }}></div>,
    <LoginForm />,
  ];

  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default Login;
