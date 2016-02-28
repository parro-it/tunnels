import uuid from 'node-uuid';
import username from 'username';

const user = username.sync();

export default function newTunnel() {
  return {
    id: uuid.v4(),
    name: '<no name>',
    localPort: 80,
    remotePort: 8080,
    hostAddress: 'localhost',
    userName: user,
    password: '',
    openOnStart: false,
    keyFile: ''
  };
}
