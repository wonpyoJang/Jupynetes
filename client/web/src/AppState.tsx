import { observable, makeObservable, action } from 'mobx';
import { ServerRepository } from './api/server/ServerRepository';
import { ServerObject } from './model/ServerObject';

class AppState {
  @observable servers: ServerObject[] = [];
  constructor() {
    makeObservable(this, {
      servers: observable,
    });
  }

  @action getInstances = async () => {
    console.log('AppState - getInstances called');
    let serverRepository: ServerRepository = new ServerRepository();
    let results = await serverRepository.getServers();
    if (results === undefined) {
      alert('error fetching instance list');
    } else {
      this.servers = results;
      console.log('   length of servers: ' + this.servers.length);
    }
  };

  @action deleteServer = (instance: ServerObject) => {
    console.log('AppState - deleteServer called');
    const newServers = this.servers.filter((item) => item !== instance);
    this.servers = newServers;
    console.log('   length of servers: ' + this.servers.length);
  };

  @action addServer = (instance: ServerObject) => {
    console.log('AppState - deleteServer called');
    this.servers.push(instance);
    console.log('   length of servers: ' + this.servers.length);
  };

  @action togleSelect = (instance: ServerObject) => {
    console.log('AppState - toggleSelect called');
    const index = this.servers.indexOf(instance);
    const newServer = this.servers;
    newServer[index].isSelected = !this.servers[index].isSelected;
    this.servers = newServer;
    console.log('   isSelected: ' + instance.isSelected);
  };
}

const appState = new AppState();

export default appState;
