const { HistoryModel } = require("../models/History");
const { UserModel } = require("../models/User");
const { AnswerModel } = require("../models/Answer");

class HistoryService {
  create = async ({ userID, answerID, score, answer }) => {
    const foundUser = await UserModel.findById(userID);
    if (!foundUser) throw new Error("User not found!");

    const foundAnswer = await AnswerModel.findById(answerID);
    if (!foundAnswer) throw new Error("Answer not found!");

    const highestScoreRecord = await HistoryModel.findOne({
      history_user_id: userID,
      history_answer_id: answerID,
    }).sort({ history_highest_score: -1 });

    const highestScore = highestScoreRecord
      ? Math.max(highestScoreRecord.history_highest_score, score)
      : score;

    await HistoryModel.updateMany(
      {
        history_user_id: userID,
        history_answer_id: answerID,
      },
      {
        $set: { history_highest_score: highestScore },
      }
    );

    const result = await HistoryModel.create({
      history_user_id: userID,
      history_answer_id: answerID,
      history_score: score,
      history_highest_score: highestScore,
      history_answer: answer,
    });

    return { result };
  };

  find = async (userID, answerID) => {
    const foundHistory = await HistoryModel.findOne({
      history_user_id: userID,
      history_answer_id: answerID,
    });
    if (!foundHistory)
      throw new Error("Cannot find your history for this test!");

    const answer = {
      _id: foundHistory._id,
      userID,
      answerID,
      score: foundHistory.history_score,
      answer: foundHistory.history_answer,
    };
    return answer;
  };

  findAllOfUser = async (userID) => {
    const foundHistorys = await HistoryModel.find({
      history_user_id: userID,
    }).sort({ answer_name: 1, createdAt: -1 });
    return foundHistorys;
  };

  findHighestScoreOfUser = async (userID) => {
    try {
      const highestScoreRecord = await HistoryModel.findOne({
        history_user_id: userID,
      })
        .sort({ history_score: -1 })
        .limit(1);

      return highestScoreRecord;
    } catch (error) {
      console.error("Error finding highest score:", error);
      throw error;
    }
  };

  findAllOfTest = async (testID) => {
    const foundHistorys = await HistoryModel.find({
      history_answer_id: testID,
    }).sort({ answer_name: 1 });
    return foundHistorys;
  };

  delete = async (userID, answerID) => {
    const foundHistory = await HistoryModel.findOne({
      history_user_id: userID,
      history_answer_id: answerID,
    });
    if (!foundHistory) throw new Error("Cannot find answer for this test!");

    const result = await HistoryModel.deleteOne({
      history_user_id: userID,
      history_answer_id: answerID,
    });
    return result;
  };

  deleteAllOfUser = async (userID) => {
    const result = await HistoryModel.deleteMany({
      history_user_id: userID,
    });
    return result;
  };

  deleteAllOfTest = async (testID) => {
    const result = await HistoryModel.deleteMany({
      history_answer_id: testID,
    });
    return result;
  };

  findHighestScoreForUserOfATest = async (userID, answerID) => {
    try {
      const highestScoreRecord = await HistoryModel.aggregate([
        {
          $match: {
            history_user_id: userID,
            history_answer_id: answerID,
          },
        },
        {
          $sort: {
            history_highest_score: -1,
          },
        },
        {
          $group: {
            _id: "$history_user_id",
            highestScoreRecord: { $first: "$$ROOT" },
          },
        },
      ]);

      return highestScoreRecord.length > 0
        ? highestScoreRecord[0].highestScoreRecord
        : null;
    } catch (error) {
      console.error("Error finding highest score:", error);
      throw error;
    }
  };

  findTop10UsersHighestScoreForEachAnswer = async () => {
    try {
      const topUsersRecords = await HistoryModel.aggregate([
        {
          $sort: {
            history_highest_score: -1,
            history_score: -1,
            _id: 1,
          },
        },
        {
          $group: {
            _id: {
              answerID: "$history_answer_id",
              userID: "$history_user_id",
            },
            highestScoreRecord: { $first: "$$ROOT" },
          },
        },
        {
          $group: {
            _id: "$_id.answerID",
            topUsers: { $push: "$highestScoreRecord" },
          },
        },
        {
          $project: {
            topUsers: { $slice: ["$topUsers", 10] },
          },
        },
      ]);

      return topUsersRecords;
    } catch (error) {
      console.error("Error finding top 10 users:", error);
      throw error;
    }
  };

  findTop10UsersForAnswer = async (answerID) => {
    try {
      const topUsersRecords = await HistoryModel.aggregate([
        {
          $match: {
            history_answer_id: answerID,
          },
        },
        {
          $sort: {
            history_highest_score: -1,
            history_score: -1,
          },
        },
        {
          $group: {
            _id: "$history_user_id",
            highestScoreRecord: { $first: "$$ROOT" },
          },
        },
        {
          $sort: {
            "highestScoreRecord.history_highest_score": -1,
          },
        },
        {
          $limit: 10,
        },
        {
          $project: {
            _id: 0,
            userID: "$_id",
            highestScoreRecord: 1,
          },
        },
      ]);

      return topUsersRecords;
    } catch (error) {
      console.error("Error finding top 10 users:", error);
      throw error;
    }
  };
}

module.exports = new HistoryService();
