import { io } from "socket.io-client";
import { Socket } from "socket.io-client/build/esm/socket";
export class Connection {
  socket: Socket;
  constructor(url: string) {
    this.socket = io(url);
    this.socket.on("disconnect", () => {
      console.log("disconnected");
    });
    this.socket.connect();
  }
  connect() {
    return new Promise((resolve, reject) => {
      this.socket.on("connect", () => {
        console.log(this.socket.connected);
        if (this.socket.connected) {
          resolve(this.socket.id);
        } else {
          this.socket.disconnect();
          reject("error");
        }
      });
      this.socket.connect();
      setTimeout(() => {
        this.socket.disconnect();
        reject("timeout");
      }, 10000);
    });
  }
  disconnect() {
    this.socket.disconnect();
    return this.socket.disconnected;
  }
}
