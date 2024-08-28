const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Comment";
const COLLECTION_NAME = "Comments";

var commentSchema = new Schema(
  {
    comment_answer_id: {
      type: String,
      ref: "Answer",
    },
    comment_user: {
      user_id: {
        type: String,
        required: true,
      },
      user_name: {
        type: String,
        required: true,
      },
      user_avatar: {
        type: String,
      },
    },
    comment_parent_name: {
      type: String,
      default: "",
    },
    comment_content: {
      type: String,
      default: "text",
    },
    comment_left: {
      type: Number,
      default: 0,
    },
    comment_right: {
      type: Number,
      default: 0,
    },
    comment_parent_id: {
      type: String,
      ref: DOCUMENT_NAME,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = {
  CommentModel: model(DOCUMENT_NAME, commentSchema),
};
