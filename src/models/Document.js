const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Document";
const COLLECTION_NAME = "Documents";

var documentSchema = new Schema(
  {
    document_name: {
      type: String,
      required: true,
    },
    document_image: {
      type: String,
    },
    document_content: {
      type: String,
      default: "",
    },
    document_link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = {
  DocumentModel: model(DOCUMENT_NAME, documentSchema),
};
