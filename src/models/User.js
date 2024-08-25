const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

var userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    user_avatar: {
      type: String,
      default: "",
    },
    user_password: {
      type: String,
      required: true,
    },
    user_birthday: {
      type: Date,
    },
    user_gender: {
      Type: String,
      enum: ["male", "female", "other"],
    },
    user_phone: {
      Type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = {
  UserModel: model(DOCUMENT_NAME, userSchema),
};
