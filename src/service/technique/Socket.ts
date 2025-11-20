import { io, type Socket } from 'socket.io-client';
import url from '../../data/constants/config';
const socketEvents = {
  connect: 'connect',
  connectError: 'connect_error',
};

class SocketST {
  private static socket: Socket;
  /**
   * @summary Connecte l'application front au serveur SocketST.socket
   * @returns {Promise}
   */
  connectToServer = async (token: string): Promise<Socket> =>
    await new Promise(async (resolve, reject) => {
      if (SocketST.socket && SocketST.socket.connected) {
        resolve(SocketST.socket);
        return;
      }
      if (token) {
        SocketST.socket = io(`${url.baseUrl.replace(/\/api$/, '')}`, {
          query: { token },
        });
        SocketST.socket.on(socketEvents.connect, () => {
          resolve(SocketST.socket);
        });
        SocketST.socket.on(socketEvents.connectError, () => {
          reject({ message: 'Impossible de se connecter au serveur' });
        });
      } else {
        reject({ message: "Veuillez d'abord vous authentifier" });
      }
    });

  disConnectToServer = async (): Promise<Socket> =>
    await new Promise(async (resolve, reject) => {
      SocketST.socket = io(url.baseUrl);
      SocketST.socket.disconnect();
      return null;
    });
}

export const socketST = new SocketST();
