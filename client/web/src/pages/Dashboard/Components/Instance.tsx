import React, { CSSProperties, FC, useState } from 'react';
import { Card, Row, Col, Button, Popover } from 'antd';
import { ServerObject, ServerStatus } from '../../../model/ServerObject';
import './Instance.css';
import appState from '../../../AppState';
import { useObserver } from 'mobx-react';
import { useHistory } from 'react-router';
import { ServerRepository } from '../../../api/server/ServerRepository';
import Icon, { InfoCircleOutlined } from '@ant-design/icons';

const gridStyle: CSSProperties = {
  backgroundColor: 'rgba(230, 230, 200, 1)',
  textAlign: 'center',
  margin: '10px 10px 10px 10px',
  borderRadius: '50px',
  border: 'solid',
  borderColor: 'rgba(230, 230, 200, 1)',
};

const SelectedGridStyle: CSSProperties = {
  backgroundColor: 'rgba(230, 230, 200, 1)',
  textAlign: 'center',
  margin: '10px 10px 10px 10px',
  borderRadius: '50px',
  border: 'solid',
  borderColor: 'rgba(20, 230, 200, 1)',
};

const infoBodyStyle: CSSProperties = {
  backgroundColor: 'rgba(230, 230, 200, 1)',
  borderColor: 'rgba(120, 70, 70, 1)',
  border: 'solid',
  borderRadius: '15px',
  textAlign: 'left',
  padding: '10px 10px 10px 10px',
  margin: '0 0 20px 0',
};

const infoUnit: CSSProperties = {
  fontSize: '14px',
  fontWeight: 'bold',
};

const instanceTitleStyle: CSSProperties = {
  fontSize: '25px',
  fontWeight: 'normal',
  lineHeight: '45px',
};

const style: CSSProperties = { background: '#0092ff', padding: '8px 0' };

const statusStyle: CSSProperties = {
  height: '25px',
  width: '25px',
  backgroundColor: '#F00',
  borderRadius: '50%',
  display: 'inline-block',
};

interface InstanceProps {
  serverData: ServerObject;
}

const Instance: FC<InstanceProps> = (props) => {
  const history = useHistory();
  const [isSelected, setIsSelected] = useState(false);

  const onClickAcessToServerHandler = (_: any) => {
    let linkUrl = `http://jupy-${props.serverData.name}.iwanhae.kr/`;
    alert(linkUrl);
    window.open(linkUrl);
  };
  const onClickDeleteServerHandler = async (_: any) => {
    let serverRepository = new ServerRepository();

    let result = await serverRepository.deleteServer(props.serverData);
    if (result === true) {
      appState.deleteServer(props.serverData);
    }
  };

  return useObserver(() => {
    const renderInstanceStatus = (serverData: ServerStatus): string => {
      switch (serverData) {
        case ServerStatus.ERROR: {
          return 'redCircle';
        }
        case ServerStatus.INITIALIZING: {
          return 'yellowCircle';
        }
        case ServerStatus.RUNNING: {
          return 'greenCircle';
        }
        case ServerStatus.STOPPED: {
          return 'greyCircle';
        }
        case ServerStatus.UNKKWON: {
          return 'blackCircle';
        }
        default: {
          return '';
        }
      }
    };

    console.log(
      'status: ' + renderInstanceStatus(props.serverData.getStatus()),
    );

    const index = appState.servers.indexOf(props.serverData);

    const serverData = props.serverData;

    const text = <span>Title</span>;
    const cpuUnitInfo = (
      <div>
        <p>cpu size in micro cores (mcore), 1000mcore = 1core</p>
      </div>
    );

    const memUnitInfo = (
      <div>
        <p>memory size in MiB, 1024MiB = 1GiB</p>
      </div>
    );

    return (
      <div
        className="ant-col ant-col-xs-24 ant-col-xl-8"
        onClick={() => {
          appState.togleSelect(serverData);
          setIsSelected(serverData.isSelected);
        }}
      >
        <Card
          title={serverData.name}
          headStyle={instanceTitleStyle}
          style={isSelected ? SelectedGridStyle : gridStyle}
        >
          <div style={infoBodyStyle}>
            <Row>
              <p>{serverData.getFormmatedCreatedAt()}</p>
              <p style={infoUnit}> &nbsp;에 생성 됨</p>
            </Row>
            <Row>
              <p>{serverData.getNDaysAgo()}</p>
              <p style={infoUnit}> &nbsp;째 구동중 </p>
            </Row>
            <Row>
              <p>{serverData.flavor.cpu}</p>
              <p style={infoUnit}> &nbsp;microCore</p>
              <Popover
                placement="rightBottom"
                content={cpuUnitInfo}
                trigger="hover"
              >
                <InfoCircleOutlined />
              </Popover>
            </Row>
            <Row>
              <p>{serverData.flavor.memory}</p>
              <p style={infoUnit}> &nbsp;MiB</p>
              <Popover
                placement="rightBottom"
                content={memUnitInfo}
                trigger="hover"
              >
                <InfoCircleOutlined />
              </Popover>
            </Row>
            <Row>
              <p>{serverData.flavor.nvidia_gpu} </p>
              <p style={infoUnit}> &nbsp;gpu_unit</p>
            </Row>
          </div>
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <span
                className={renderInstanceStatus(props.serverData.getStatus())}
              ></span>
            </Col>
            <Col className="gutter-row" span={10}></Col>
            <Col className="gutter-row" span={2}>
              <Button onClick={onClickDeleteServerHandler} danger>
                삭제
              </Button>
            </Col>
            <Col className="gutter-row" span={1}></Col>
            <Col className="gutter-row" span={2}>
              <Button onClick={onClickAcessToServerHandler}>접속</Button>
            </Col>
          </Row>
        </Card>
      </div>
    );
  });
};

export default Instance;
