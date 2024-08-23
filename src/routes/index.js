const uploadRouter = require("./upload");
const answerRouter = require("./answer");
const userRouter = require("./user");

function route(app) {
  app.use("/api/v1/upload", uploadRouter);
  app.use("/api/v1/answer", answerRouter);
  app.use("/api/v1/user", userRouter);
}

module.exports = route;
