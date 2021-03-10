import { plainToClass } from 'class-transformer';
import { assert } from 'console';
import { client } from '../../App';
import Tools from '../../common/tools';
import { UserInfo } from '../../model/UserInfo';
const axios = require('axios').default;

export class UserRepository {
  provider: UserFakeProvider;

  constructor() {
    this.provider = new UserFakeProvider();
  }

  async getAdminUser() {
    let result: string = await this.provider.getAdminUser();
    let json = JSON.parse(result);
    let users = plainToClass(UserInfo, json);
    return users;
  }

  async getUser() {
    axios.defaults.withCredentials = true;
    var response;
    try {
      response = await client.get('/user', {
        withCredentials: true,
        headers: { crossDomain: true, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      Tools.showErrorAlert('유저정보 로딩에 실패했습니다', error);
      return;
    }

    let userInfo = plainToClass(UserInfo, response.data);
    return userInfo;
  }

  async postUser(password: string, newPassword: string) {
    axios.defaults.withCredentials = true;
    var response;
    console.log('id ; ' + password);
    console.log('password ; ' + newPassword);
    try {
      response = await client.post(
        '/user',
        {
          password: password,
          new_password: newPassword,
        },
        {
          withCredentials: true,
          headers: { crossDomain: true, 'Content-Type': 'application/json' },
        },
      );
    } catch (error) {
      Tools.showErrorAlert('비밀번호 변경에 실패했습니다.', error);
      return;
    }

    return response;
  }

  async postLogin(id: string, password: string) {
    axios.defaults.withCredentials = true;
    var response;
    console.log('id ; ' + id);
    console.log('password ; ' + password);
    try {
      response = await client.post(
        '/login',
        {
          id: id,
          pw: password,
        },
        {
          withCredentials: true,
          headers: { crossDomain: true, 'Content-Type': 'application/json' },
        },
      );
    } catch (error) {
      alert(
        '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.\n\n' +
          '[에러코드]\n' +
          error,
      );
      return;
    }

    return response;
  }

  async getLogout() {
    axios.defaults.withCredentials = true;
    var response;
    try {
      response = await client.get('/logout', {
        withCredentials: true,
        headers: { crossDomain: true, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      Tools.showErrorAlert('로그아웃에 실패했습니다.', error);
      return;
    }

    return true;
  }
}

class UserFakeProvider {
  constructor() {}

  getAdminUser(): string {
    return `[
                    {
                        "id": "string",
                        "user_quota": {
                            "instance": 1,
                            "cpu": 2,
                            "memmory": 3,
                            "nvidia_gpu": 4,
                            "storage": 5
                        },
                        "group_quota": {
                            "instance": 6,
                            "cpu": 7,
                            "memmory": 8,
                            "nvidia_gpu": 9,
                            "storage": 10
                        }
                    }
                ]`;
  }

  getUser(): string {
    return `[
                    {
                        "id": "string",
                        "user_quota": {
                            "instance": 1,
                            "cpu": 2,
                            "memmory": 3,
                            "nvidia_gpu": 4,
                            "storage": 5
                        },
                        "group_quota": {
                            "instance": 6,
                            "cpu": 7,
                            "memmory": 8,
                            "nvidia_gpu": 9,
                            "storage": 10
                        }
                    }
                ]`;
  }
}
