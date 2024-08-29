class SiteController {
  async welcome(req, res, next) {
    res.status(200).send({ message: "Welcome to the TOEIC API!" });
  }
}

module.exports = new SiteController();
