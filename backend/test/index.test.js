import { expect } from "chai";
import { io } from "socket.io-client";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = 5000;
const socketURL = `http://localhost:${PORT}`;

describe("Socket.IO Chat Server", () => {
  let clientSocket;
  let httpServer;
  let ioServer;

  before((done) => {
    httpServer = createServer();
    ioServer = new Server(httpServer, {
      cors: {
        origin: "*",
      },
    });

    ioServer.on("connection", (socket) => {
      socket.on("message", (msg) => {
        socket.emit("message", msg); // Echo back
      });
    });

    httpServer.listen(PORT, done);
  });

  beforeEach((done) => {
    clientSocket = io(socketURL);
    clientSocket.on("connect", done);
  });

  afterEach(() => {
    if (clientSocket.connected) {
      clientSocket.disconnect();
    }
  });

  after((done) => {
    ioServer.close();
    httpServer.close(done);
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
