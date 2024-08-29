const AnswerService = require("../services/answer");
class SiteController {
  async welcome(req, res, next) {
    try {
      const result = await AnswerService.findAll();
      console.log(result);
      res.status(200).send(result);
    } catch (err) {
      res.send(err);
    }
  }
}

module.exports = new SiteController();
