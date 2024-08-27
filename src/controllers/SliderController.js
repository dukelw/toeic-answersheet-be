const SliderService = require("../services/slider");

class SliderController {
  async create(req, res, next) {
    const { collection, content, image, link } = req.body;
    const result = await SliderService.add({
      collection,
      content,
      image,
      link,
    });
    res.status(200).send(result);
  }

  async update(req, res, next) {
    const { ID, update } = req.body;
    const result = await SliderService.update(ID, update);
    res.status(200).send(result);
  }

  async toggle(req, res, next) {
    const { collection, activate } = req.body;
    const result = await SliderService.changeStatus(collection, activate);
    res.status(200).send(result);
  }

  async find(req, res, next) {
    const ID = req.params.id;
    const result = await SliderService.find(ID);
    res.status(200).send(result);
  }

  async findCollections(req, res, next) {
    const keySearch = req.query.key;
    const result = await SliderService.findCollections(keySearch);
    res.status(200).send(result);
  }

  async findAll(req, res, next) {
    const result = await SliderService.findAll();
    res.status(200).send(result);
  }

  async findActive(req, res, next) {
    const result = await SliderService.findActive();
    res.status(200).send(result);
  }

  async findByCollection(req, res, next) {
    const collection = req.params.collection;
    const result = await SliderService.findByCollection(collection);
    res.status(200).send(result);
  }

  async delete(req, res, next) {
    const ID = req.params.id;
    const result = await SliderService.delete(ID);
    res.status(200).send(result);
  }

  async deleteCollection(req, res, next) {
    const collection = req.params.collection;
    const result = await SliderService.deleteCollection(collection);
    res.status(200).send(result);
  }
}

module.exports = new SliderController();
