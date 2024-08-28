const NotificationService = require("../services/notification");

class NotificationController {
  async create(req, res, next) {
    const result = await NotificationService.create(req.body);
    res.status(200).send(result);
  }

  async getAll(req, res, next) {
    const ID = req.params.id;
    console.log(ID);
    const result = await NotificationService.getAllNotifications(ID);
    res.status(200).send(result);
  }

  async markRead(req, res, next) {
    const result = await NotificationService.markRead(req.body);
    res.status(200).send(result);
  }
}

module.exports = new NotificationController();
