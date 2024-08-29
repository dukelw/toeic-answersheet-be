const AnswerController = require("./AnswerController");
class SiteController {
  async welcome(req, res, next) {
    const result = await AnswerController.getAll("TOEIC");
    res.status(200).send(result);
  }
}

module.exports = new SiteController();
