const coap = require("coap");
const app = require("./app");
require("dotenv").config();

const hostname = process.env.hostname;
const port = process.env.port_server;

const server = coap.createServer(app);

server.listen(() => {
  console.log(
    `The CoAP server is now running coap://${hostname}:${port}.\n` + app.help
  );
});
