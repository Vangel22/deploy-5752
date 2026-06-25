const config = require("../../pkg/config");
const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");

const app = express();

// detalica.com
// api.detalica.com -> mojata logika

// Na nasata masina imame localhost
// localhost = 127.0.0.1

// proxy-port = 10000
// http://localhost:<proxy-port>/api/v1/storage
app.use(
  "/api/v1/storage", // match the req endpoint
  proxy("http://127.0.0.1:10001", {
    // match the port
    proxyReqPathResolver: (req) => {
      // match the endpoint resource
      `http://127.0.0.1:10001/api/v1/storage${req.url}`; // upload,download
    },
  }),
);

app.use(
  "/api/v1/auth",
  proxy("http://127.0.0.1:10002", {
    proxyReqPathResolver: (req) =>
      `http://127.0.0.1:10002/api/v1/auth${req.url}`, // req.url = login, register
  }),
);

app.use(
  "/api/v1/posts",
  proxy("http://127.0.0.1:10003", {
    proxyReqPathResolver: (req) =>
      `http://127.0.0.1:10003/api/v1/posts${req.url}`,
  }),
);

app.use(
  "/api/cars",
  proxy("http://127.0.0.1:10004", {
    proxyReqPathResolver: (req) => `http://127.0.0.1:10004/api/cars${req.url}`,
  }),
);

const PORT = process.env.PORT || config.getSection("services").proxy.port;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Service [proxy] successfully started on port", PORT);
});
