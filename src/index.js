require("dotenv").config();
const cors = require("cors");
const express = require("express");
const route = require("./routes");
const app = express();
const PORT = 4000;
const http = require("http");
const { Server } = require("socket.io");
const commentService = require("../src/services/comment");

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

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:: " + socket.id);

  socket.on("join_room", (answerID) => {
    socket.join(answerID);
    console.log(`User with ID: ${socket.id} joined room: ${answerID}`);
  });

  socket.on("send_comment", async (data) => {
    const { answer_id, user_id, content, parent_comment_id } = data;
    if (answer_id && user_id && content) {
      const newComment = await commentService.createComment({
        answer_id,
        user_id,
        content,
        parent_comment_id,
      });
      if (parent_comment_id) {
        io.in(answer_id).emit("reply_comment", {});
      } else {
        io.in(answer_id).emit("receive_comment", newComment);
      }
    }
    console.log("Room:: ", answer_id);
  });

  socket.on("delete_comment", async (data) => {
    const { answer_id } = data;
    io.in(answer_id).emit("change_comment", {
      message: `comment has changed, delete ${data}`,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

const runningServer = server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  runningServer.close(() => console.log("Exit server express"));
});

module.exports = app;
