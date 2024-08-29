const AnswerService = require("../services/answer");
class SiteController {
  async welcome(req, res, next) {
    const result = await AnswerService.findAll();
    console.log(result);
    res.status(200).send(result);
  }
}

module.exports = new SiteController();
