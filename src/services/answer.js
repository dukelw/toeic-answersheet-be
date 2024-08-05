const { AnswerModel } = require("../models/Answer");

class AnswerService {
  add = async ({ name, content, image }) => {
    const foundAnswer = await AnswerModel.findOne({ answer_name: name });
    if (foundAnswer) throw new Error("This test already has an answer!");

    const result = await AnswerModel.create({
      answer_name: name,
      answer_content: content,
      answer_image: image,
    });

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
    };
    return answer;
  };

  findAll = async () => {
    const foundAnswers = await AnswerModel.find().sort({ answer_name: 1 });
    return foundAnswers;
  };
}

module.exports = new AnswerService();
