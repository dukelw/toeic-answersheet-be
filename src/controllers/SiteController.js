const AnswerService = require("../services/answer");
class SiteController {
  async welcome(req, res, next) {
    res.send({ message: "Welcome to Answer API" });
  }
}

module.exports = new SiteController();
