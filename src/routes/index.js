const uploadRouter = require("./upload");
const answerRouter = require("./answer");
const userRouter = require("./user");
const historyRouter = require("./history");
const documentRouter = require("./document");

function route(app) {
  app.use("/api/v1/upload", uploadRouter);
  app.use("/api/v1/answer", answerRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/history", historyRouter);
  app.use("/api/v1/document", documentRouter);
}

module.exports = route;
