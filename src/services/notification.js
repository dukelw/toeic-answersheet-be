const { NotificationModel } = require("../models/Notification");
const { UserModel } = require("../models/User");

class NotificationService {
  create = async ({
    notification_answer_id,
    notification_sender_id,
    notification_receiver_id = null,
    notification_content,
  }) => {
    if (!notification_receiver_id) {
      const foundAdmin = await UserModel.findOne({ isAdmin: true });
      notification_receiver_id = foundAdmin._id;
    }
    const result = await NotificationModel.create({
      notification_answer_id,
      notification_sender_id,
      notification_receiver_id,
      notification_content,
    });

    return { result };
  };

  getAllNotifications = async (userID) => {
    const notifications = await NotificationModel.find({
      notification_receiver_id: userID,
      notification_sender_id: { $ne: userID },
    }).sort({
      createdAt: -1,
    });
    return notifications;
  };

  markRead = async ({ answerID, userID }) => {
    const foundNotification = await NotificationModel.find({
      notification_answer_id: answerID,
      notification_receiver_id: userID,
    });
    if (!foundNotification) throw new Error("Notification not found!");

    const result = await NotificationModel.updateMany(
      { notification_answer_id: answerID, notification_receiver_id: userID },
      { $set: { isRead: true } },
      { upsert: false }
    );

    return { result };
  };
}

module.exports = new NotificationService();
