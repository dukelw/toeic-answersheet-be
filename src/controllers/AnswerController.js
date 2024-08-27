const AnswerService = require("../services/answer");

class AnswerController {
  async create(req, res, next) {
    const { name, content, image, audio } = req.body;
    console.log(req.body, name, content, image);
    const result = await AnswerService.add({ name, content, image, audio });
    res.status(200).send(result);
  }

  async update(req, res, next) {
    const { name, update } = req.body;
    const result = await AnswerService.update(name, update);
    res.status(200).send(result);
  }

  async find(req, res, next) {
    const ID = req.params.id;
    console.log(ID);
    const result = await AnswerService.find(ID);
    res.status(200).send(result);
  }

  async getAll(req, res, next) {
    const keySearch = req.query.key;
    const result = await AnswerService.findAll(keySearch);
    res.status(200).send(result);
  }

  async delete(req, res, next) {
    const ID = req.params.id;
    const result = await AnswerService.delete(ID);
    res.status(200).send(result);
  }
}

module.exports = new AnswerController();
