import React, { useCallback, useEffect } from 'react';
import 'antd/dist/antd.css';
import '../../../index.css';
import './Dashboard.less';
import ChangePassword from '../../ChangePassword/ChangePassword';
import { Layout, Button } from 'antd';
import CSS from 'csstype';
import { InstanceListContainer } from '../Container/InstanceListContainer';
import { useHistory, useLocation } from 'react-router-dom';
import { UserRepository } from '../../../api/user/UserRepository';

const { Footer } = Layout;
const mypageStyle: CSS.Properties = {
  margin: 'auto',
  marginRight: '5px',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 15fr 1fr 1fr',
  backgroundColor: 'rgba(149, 206, 237, 1)',
  height: '50px',
};

const logoutButtonStyle: CSS.Properties = {
  backgroundColor: 'rgba(255, 255, 255, 1)',
  border: 'solid',
  borderColor: 'rgba(78, 185, 242,1)',
};

const buttonArea: CSS.Properties = {
  fontSize: '14px',
  fontWeight: 'bold',
  marginTop: 'auto',
  marginBottom: 'auto',
};

const Dashboard = (props: any) => {
  const history = useHistory();
  const location: any = useLocation();
  const handleOnClickLogout = useCallback(async () => {
    let userRepository = new UserRepository();
    let result = await userRepository.getLogout();
    if (result === true) {
      history.push('/login');
    }
  }, [history]);

  return (
    <>
      <Layout>
        <div style={mypageStyle}>
          <div style={buttonArea}>{location.state.userId}</div>
          <div style={buttonArea}></div>
          <div style={buttonArea}>
            <ChangePassword username={location.state.userId}></ChangePassword>
          </div>
          <div style={buttonArea}>
            <Button style={logoutButtonStyle} onClick={handleOnClickLogout}>
              로그아웃
            </Button>
          </div>
        </div>
        <InstanceListContainer />
        <Footer style={{ textAlign: 'center' }}>Jupynetes ©2021</Footer>
      </Layout>
    </>
  );
};

export default Dashboard;
