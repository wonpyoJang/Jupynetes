import React, { CSSProperties, FC, useState } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { ServerObject, ServerStatus } from '../../../model/ServerObject';
import './Instance.css';
import appState from '../../../AppState';
import { useObserver } from 'mobx-react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { ServerRepository } from '../../../api/server/ServerRepository';

const gridStyle: CSSProperties = {
  backgroundColor: 'yellow',
  width: '33%',
  textAlign: 'center',
};

const infoStyle: CSSProperties = {
  textAlign: 'left',
  margin: '50px',
};

const infoBodyStyle: CSSProperties = {
  backgroundColor: 'rgba(255, 0, 0, 1)',
};

const infoBodyStyleSelected: CSSProperties = {
  backgroundColor: 'rgba(0, 100, 0, 1)',
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

    return (
      <div
        onClick={() => {
          appState.togleSelect(props.serverData);
          setIsSelected(props.serverData.isSelected);
        }}
      >
        <Card.Grid style={gridStyle}>
          <Card title={props.serverData.name}>
            <Card
              extra={<a>정보수정</a>}
              style={infoStyle}
              bodyStyle={isSelected ? infoBodyStyleSelected : infoBodyStyle}
            >
              <p>{props.serverData.getFormmatedCreatedAt()} 에 생성 됨</p>
              <p>{props.serverData.getNDaysAgo()} 째 구동중 </p>
              <p>각종 잡다한 세부정보</p>
              <p>구동중인 이미지</p>
            </Card>
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <div style={style}>
                  <span
                    className={renderInstanceStatus(
                      props.serverData.getStatus(),
                    )}
                  ></span>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}>
                  <Button onClick={onClickDeleteServerHandler} danger>
                    삭제
                  </Button>
                </div>
              </Col>
              {/* <Col className="gutter-row" span={6}>
                <div style={style}>
                  <Button danger>재시작</Button>
                </div>
              </Col> */}
              <Col className="gutter-row" span={6}>
                <div style={style}>
                  <Button danger onClick={onClickAcessToServerHandler}>
                    접속
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Card.Grid>
      </div>
    );
  });
};

export default Instance;
