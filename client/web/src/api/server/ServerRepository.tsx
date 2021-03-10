import { plainToClass } from 'class-transformer';
import { ServerResponse } from 'http';
import { client } from '../../App';
import Tools from '../../common/tools';
import { ServerObject } from '../../model/ServerObject';

const isTest = false;
const axios = require('axios').default;

export class ServerRepository {
  provider: ServerProvider;

  constructor() {
    this.provider = new ServerProvider();
  }

  async getServers() {
    let result = await this.provider.getServers();
    if (result === undefined) {
      return;
    } else {
      let servers = plainToClass(ServerObject, result.data as any[]);
      return servers;
    }
  }

  async postServer(serverObject: any) {
    let result = await this.provider.postServer(serverObject);
    if (result === undefined) {
      alert('인스턴스 생성에 실패했습니다.');
      return;
    } else {
      let server = plainToClass(ServerObject, result.data);
      return server;
    }
  }

  //   async getServer() {
  //     let result: any = await this.provider.getServer();

  //     return null;
  //   }

  async deleteServer(serverObject: ServerObject) {
    let result: boolean = await this.provider.deleteServer(serverObject);
    return result;
  }
}

class ServerProvider {
  constructor() {}

  async getServers() {
    axios.defaults.withCredentials = true;
    var response;
    try {
      response = await client.get('/server', {
        withCredentials: true,
        headers: { crossDomain: true, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      Tools.showErrorAlert('서버 정보 획득에 실패했습니다.', error);
      return;
    }
    return response;
  }

  async postServer(serverObject: any) {
    axios.defaults.withCredentials = true;
    var response;

    try {
      response = await client.post('/server', serverObject, {
        withCredentials: true,
        headers: { crossDomain: true, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      Tools.showErrorAlert('서버 생성에 실패했습니다', error);
    }

    return response;
  }

  async deleteServer(serverObject: ServerObject) {
    axios.defaults.withCredentials = true;
    var response;

    try {
      response = await client.delete(`/server/${serverObject.id}`, {
        withCredentials: true,
        headers: { crossDomain: true, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      Tools.showErrorAlert('삭제에 실패했습니다.', error);
      return false;
    }
    return true;
  }
}

class ServerFakeProvider {
  constructor() {}

  getServers(): any {
    let data = `[
            {
                "id": "1",
                "name": "사과서버",
                "description": "사과서버입니다.",
                "template": {
                "id": 0,
                "name": "사과템플릿",
                "description": "사과템플릿입니다.",
                "bdoy": "string",
                "variables": [
                    {
                    "name": "string",
                    "value": "string"
                    }
                ]
                },
                "flavor": {
                "cpu": 55,
                "memory": 22,
                "nvidia_gpu": 44
                },
                "created_at": "2021-01-02T08:30:00Z",
                "status": "running",
                "message": "string",
                "last_transition_time": "2021-01-02T08:30:00Z",
                "last_probe_time": "2021-01-02T08:30:00Z",
                "owner": [
                "2016920036",
                "admin"
                ]
            },
            {
                "id": "2",
                "name": "오렌지서버",
                "description": "사과서버입니다.",
                "template": {
                "id": 0,
                "name": "사과템플릿",
                "description": "사과템플릿입니다.",
                "bdoy": "string",
                "variables": [
                    {
                    "name": "string",
                    "value": "string"
                    }
                ]
                },
                "flavor": {
                "cpu": 55,
                "memory": 22,
                "nvidia_gpu": 44
                },
                "created_at": "2021-01-11T08:30:00Z",
                "status": "error",
                "message": "string",
                "last_transition_time": "2021-01-11T08:30:00Z",
                "last_probe_time": "2021-01-11T08:30:00Z",
                "owner": [
                "2016920036",
                "admin"
                ]
            }
        ]`;

    let json = JSON.parse(data);
    let servers = plainToClass(ServerObject, json);
    return servers;
  }

  postServer(): string {
    return `{
            "id": "string",
            "name": "string",
            "description": "string",
            "template": {
                "id": 0,
                "name": "string",
                "description": "string",
                "bdoy": "string",
                "variables": [
                {
                    "name": "string",
                    "value": "string"
                }
                ]
            },
            "flavor": {
                "cpu": 0,
                "memory": 0,
                "nvidia_gpu": 0
            },
            "created_at": "2021-01-30T08:30:00Z",
            "status": "running",
            "message": "string",
            "last_transition_time": "2021-01-30T08:30:00Z",
            "last_probe_time": "2021-01-30T08:30:00Z",
            "owner": [
                "2016920036",
                "admin"
            ]
            }`;
  }

  getServer(): string {
    return `{
            "id": "string",
            "name": "string",
            "description": "string",
            "template": {
                "id": 0,
                "name": "string",
                "description": "string",
                "bdoy": "string",
                "variables": [
                {
                    "name": "string",
                    "value": "string"
                }
                ]
            },
            "flavor": {
                "cpu": 0,
                "memory": 0,
                "nvidia_gpu": 0
            },
            "created_at": "2021-01-30T08:30:00Z",
            "status": "running",
            "message": "string",
            "last_transition_time": "2021-01-30T08:30:00Z",
            "last_probe_time": "2021-01-30T08:30:00Z",
            "owner": [
                "2016920036",
                "admin"
            ]
        }`;
  }
}
