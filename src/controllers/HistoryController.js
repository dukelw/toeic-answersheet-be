const HistoryService = require("../services/history");

class HistoryController {
  async create(req, res, next) {
    const { userID, answerID, score, answer } = req.body;

    const result = await HistoryService.create({
      userID,
      answerID,
      score,
      answer,
    });
    res.status(200).send(result);
  }

  async find(req, res, next) {
    const { userID, answerID } = req.query;
    const result = await HistoryService.find(userID, answerID);
    res.status(200).send(result);
  }

  async getAllOfTest(req, res, next) {
    const ID = req.params.id;
    const result = await HistoryService.findAllOfTest(ID);
    res.status(200).send(result);
  }

  async getAllOfUser(req, res, next) {
    const ID = req.params.id;
    const result = await HistoryService.findAllOfUser(ID);
    res.status(200).send(result);
  }

  async getHighestOfUser(req, res, next) {
    const ID = req.params.id;
    const result = await HistoryService.findHighestScoreOfUser(ID);
    res.status(200).send(result);
  }

  async delete(req, res, next) {
    const ID = req.params.id;
    const result = await HistoryService.delete(ID);
    res.status(200).send(result);
  }

  async findHighest(req, res, next) {
    const { userID, answerID } = req.query;
    const result = await HistoryService.findHighestScoreForUserOfATest(
      userID,
      answerID
    );
    res.status(200).send(result);
  }

  async getRankOfAllTest(req, res, next) {
    const result =
      await HistoryService.findTop10UsersHighestScoreForEachAnswer();
    res.status(200).send(result);
  }

  async getRankOfATest(req, res, next) {
    const ID = req.params.id;
    const result = await HistoryService.findTop10UsersForAnswer(ID);
    res.status(200).send(result);
  }
}

module.exports = new HistoryController();
