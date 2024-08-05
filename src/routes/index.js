const uploadRouter = require("./upload");
const answerRouter = require("./answer");

function route(app) {
  app.use("/api/v1/upload", uploadRouter);
  app.use("/api/v1/answer", answerRouter);
}

module.exports = route;
