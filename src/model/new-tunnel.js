import uuid from 'node-uuid';

export default function newTunnel() {
  return {
    id: uuid.v4(),
    name: '<no name>',
    localPort: 80,
    remotePort: 8080,
    hostAddress: 'localhost',
    userName: 'root',
    password: '',
    openOnStart: false,
    keyFile: ''
  };
}
