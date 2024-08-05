const AnswerService = require("../services/answer");

class AnswerController {
  async create(req, res, next) {
    const { name, content, image } = req.body;
    console.log(req.body, name, content, image);
    const result = await AnswerService.add({ name, content, image });
    res.send(result);
  }

  async find(req, res, next) {
    const ID = req.params.id;
    console.log(ID);
    const result = await AnswerService.find(ID);
    res.status(200).send(result);
  }

  async getAll(req, res, next) {
    const result = await AnswerService.findAll();
    res.status(200).send(result);
  }
}

module.exports = new AnswerController();
