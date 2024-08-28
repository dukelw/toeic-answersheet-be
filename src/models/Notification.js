const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Notification";
const COLLECTION_NAME = "Notifications";

var notificationSchema = new Schema(
  {
    notification_answer_id: {
      type: String,
      ref: "Answer",
    },
    notification_sender_id: {
      type: String,
      required: true,
    },
    notification_receiver_id: {
      type: String,
      required: true,
    },
    notification_content: {
      type: String,
    },
    isRead: {
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
  NotificationModel: model(DOCUMENT_NAME, notificationSchema),
};
