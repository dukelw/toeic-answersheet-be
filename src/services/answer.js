const { AnswerModel } = require("../models/Answer");

class AnswerService {
  add = async ({ name, content, image, audio }) => {
    const foundAnswer = await AnswerModel.findOne({ answer_name: name });
    if (foundAnswer) throw new Error("This test already has an answer!");

    const result = await AnswerModel.create({
      answer_name: name,
      answer_content: content,
      answer_image: image,
      answer_audio: audio,
    });

    return { result };
  };

  update = async (name, bodyUpdate) => {
    const foundAnswer = await AnswerModel.findOne({ answer_name: name });

    if (!foundAnswer) throw new Error("Answer not found!");

    const result = await AnswerModel.updateOne(
      { answer_name: name },
      { $set: bodyUpdate },
      { upsert: true }
    );

    return { result };
  };

  find = async (ID) => {
    const foundAnswer = await AnswerModel.findById(ID);
    if (!foundAnswer) throw new Error("Cannot find answer for this test!");

    const answer = {
      _id: foundAnswer._id,
      name: foundAnswer.answer_name,
      content: foundAnswer.answer_content,
      image: foundAnswer.answer_image,
      audio: foundAnswer.answer_audio,
    };
    return answer;
  };

  findAll = async (keySearch = "") => {
    let foundAnswers;
    if (keySearch) {
      foundAnswers = await AnswerModel.find({
        answer_name: { $regex: keySearch, $options: "i" },
      }).sort({
        answer_name: 1,
      });
    } else {
      foundAnswers = await AnswerModel.find().sort({
        answer_name: 1,
      });
    }
    return foundAnswers;
  };

  delete = async (ID) => {
    const foundAnswer = await AnswerModel.findById(ID);
    if (!foundAnswer) throw new Error("Cannot find answer for this test!");

    const result = await AnswerModel.deleteOne({ _id: ID });
    return result;
  };
}

module.exports = new AnswerService();
