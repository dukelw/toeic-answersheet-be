const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Answer";
const COLLECTION_NAME = "Answers";

var answerSchema = new Schema(
  {
    answer_name: {
      type: String,
      required: true,
    },
    answer_content: {
      type: String,
      default: "",
      required: true,
    },
    answer_image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = {
  AnswerModel: model(DOCUMENT_NAME, answerSchema),
};
