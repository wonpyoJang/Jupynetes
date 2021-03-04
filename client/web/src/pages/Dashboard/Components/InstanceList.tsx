import React, { FC } from 'react';
import { Card, Row, Col } from 'antd';
import CreateInstance from '../../CreateInstance/CreateInstance';
import appState from '../../../AppState';
import { ServerObject } from '../../../model/ServerObject';
import InstanceContainer from '../Container/InstanceContainer';
import { useObserver } from 'mobx-react';
import CSS from 'csstype';

const InstanceList: FC<Object> = () => {
  const myInstacneTitle: CSS.Properties = {
    fontSize: '30px',
    fontWeight: 'normal',
    lineHeight: '45px',
  };

  return useObserver(() => {
    return (
      <>
        <div id="test">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
        <div id="test">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}></Col>
          <Col className="gutter-row" span={6}></Col>
          <Col className="gutter-row" span={6}></Col>
          <Col className="gutter-row" span={6}>
            <CreateInstance></CreateInstance>
          </Col>
        </Row>
        <p style={myInstacneTitle}>내 인스턴스 목록</p>
        <div className="ant-row">
          {appState.servers.map(function (item: any) {
            return <InstanceContainer serverData={item}></InstanceContainer>;
          })}
        </div>
      </>
    );
  });
};

export default InstanceList;
