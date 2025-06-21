import { expect } from "chai";
import { io } from "socket.io-client";

const socketURL = "http://localhost:5000";

describe("Socket.IO Chat Server", () => {
  let clientSocket;

  beforeEach((done) => {
    clientSocket = io(socketURL);
    clientSocket.on("connect", () => {
      done();
    });
  });

  afterEach(() => {
    if (clientSocket.connected) {
      clientSocket.disconnect();
    }
  });

  it("should receive the same message that was sent", (done) => {
    const testMessage = { username: "Suryansh", message: "Hello from test!" };

    clientSocket.on("message", (msg) => {
      expect(msg).to.deep.equal(testMessage);
      done();
    });

    clientSocket.emit("message", testMessage);
  });
});
