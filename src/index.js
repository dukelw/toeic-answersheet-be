require("dotenv").config();
const cors = require("cors");
const express = require("express");
const route = require("./routes");
const app = express();
const PORT = 4000;

const corsOptions = {
  origin: "http://localhost:1610",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true, // enable set cookie
};

app.use(cors());

// Init middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Init db
require("./databases/connect-mongodb");

// Use routes
route(app);

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exit server express"));
});

module.exports = app;
