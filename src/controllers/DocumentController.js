const DocumentService = require("../services/document");

class DocumentController {
  async create(req, res, next) {
    const { name, content, image, link } = req.body;
    const result = await DocumentService.add({ name, content, image, link });
    res.status(200).send(result);
  }

  async update(req, res, next) {
    const { name, update } = req.body;
    const result = await DocumentService.update(name, update);
    res.status(200).send(result);
  }

  async find(req, res, next) {
    const ID = req.params.id;
    console.log(ID);
    const result = await DocumentService.find(ID);
    res.status(200).send(result);
  }

  async getAll(req, res, next) {
    const keySearch = req.query.key;
    const result = await DocumentService.findAll(keySearch);
    res.status(200).send(result);
  }

  async delete(req, res, next) {
    const ID = req.params.id;
    const result = await DocumentService.delete(ID);
    res.status(200).send(result);
  }
}

module.exports = new DocumentController();
