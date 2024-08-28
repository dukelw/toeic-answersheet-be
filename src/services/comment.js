const { NotFoundError } = require("../core/error-response");
const { CommentModel } = require("../models/Comment");
const { AnswerModel } = require("../models/Answer");
const { UserModel } = require("../models/User");

class CommentService {
  async createComment({
    answer_id,
    user_id,
    content,
    parent_comment_id = null,
  }) {
    const foundUser = await UserModel.findById(user_id);
    if (!foundUser) {
      throw new NotFoundError("User not found");
    }
    let parent_name = "";
    if (parent_comment_id) {
      const foundComment = await CommentModel.findById(parent_comment_id);
      if (!foundComment) {
        throw new NotFoundError("User not found");
      }
      parent_name = foundComment.comment_user.user_name;
    }
    const comment = new CommentModel({
      comment_answer_id: answer_id,
      comment_user: {
        user_id,
        user_name: foundUser.user_name,
        user_avatar: foundUser.user_avatar,
      },
      comment_parent_name: parent_name,
      comment_content: content,
      comment_parent_id: parent_comment_id,
    });

    let rightValue;
    if (parent_comment_id) {
      // Reply comment
      const parentComment = await CommentModel.findById(parent_comment_id);
      if (!parentComment)
        throw new NotFoundError("Can not find parent comment");

      rightValue = parentComment.comment_right;

      // Update many comments
      await CommentModel.updateMany(
        {
          comment_answer_id: answer_id,
          comment_right: { $gte: rightValue },
        },
        {
          $inc: {
            comment_right: 2,
          },
        }
      );

      await CommentModel.updateMany(
        {
          comment_answer_id: answer_id,
          comment_left: { $gt: rightValue },
        },
        {
          $inc: { comment_left: 2 },
        }
      );
    } else {
      const maxRightValue = await CommentModel.findOne(
        {
          comment_answer_id: answer_id,
        },
        "comment_right",
        { sort: { comment_right: -1 } }
      );
      if (maxRightValue) {
        rightValue = maxRightValue.comment_right + 1;
      } else {
        rightValue = 1;
      }
    }

    // Insert to comment
    comment.comment_left = rightValue;
    comment.comment_right = rightValue + 1;
    return await comment.save();
  }

  async getCommentByParentID({
    answer_id,
    parent_comment_id,
    limit = 10,
    offset = 0,
  }) {
    if (parent_comment_id) {
      const parentComment = await CommentModel.findById(parent_comment_id);
      if (!parentComment)
        throw new NotFoundError("Can not find parent comment");

      const comment = await CommentModel.find({
        comment_answer_id: answer_id,
        comment_left: { $gt: parentComment.comment_left },
        comment_right: { $lte: parentComment.comment_right },
      })
        .select({
          comment_left: 1,
          comment_right: 1,
          comment_content: 1,
          comment_parent_id: 1,
          comment_user: 1,
          comment_parent_name: 1,
          comment_answer_id: 1,
          createdAt: 1,
          updatedAt: 1,
        })
        .sort({ comment_left: 1 });
      return comment;
    }
    const comments = await CommentModel.find({
      comment_answer_id: answer_id,
      comment_parent_id: parent_comment_id,
    })
      .select({
        comment_left: 1,
        comment_right: 1,
        comment_content: 1,
        comment_parent_id: 1,
        comment_user: 1,
        comment_parent_name: 1,
        comment_answer_id: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .sort({
        comment_left: 1,
      });
    return comments;
  }

  async getCommentByID({ comment_id, limit = 10, offset = 0 }) {
    const comment = await CommentModel.findById(comment_id);
    return comment;
  }

  async deleteComment({ comment_id, answer_id }) {
    // Check answer's existence in database
    const foundAnswer = await AnswerModel.findById(answer_id);
    if (!foundAnswer) throw new NotFoundError("Answer not found");

    // 1. Get left value and right value of comment
    const comment = await CommentModel.findById(comment_id);
    if (!comment) throw new NotFoundError("Comment not found");

    const leftValue = comment.comment_left;
    const rightValue = comment.comment_right;

    // 2. Calculate width
    const width = rightValue - leftValue + 1;

    // 3. Delete all comment which is child of the deleted comment
    await CommentModel.deleteMany({
      comment_answer_id: answer_id,
      comment_left: { $gte: leftValue, $lte: rightValue },
    });

    // 4. Update left and right of the rest comments
    await CommentModel.updateMany(
      {
        comment_answer_id: answer_id,
        comment_right: { $gt: rightValue },
      },
      {
        $inc: { comment_right: -width },
      }
    );

    await CommentModel.updateMany(
      {
        comment_answer_id: answer_id,
        comment_left: { $gt: rightValue },
      },
      {
        $inc: { comment_left: -width },
      }
    );
    return true;
  }

  async getParentCommentOfAnswer(answer_id) {
    const foundAnswer = await AnswerModel.findById(answer_id);
    if (!foundAnswer) throw new NotFoundError("Answer not found");

    const parentComments = await CommentModel.find({
      comment_answer_id: answer_id,
      comment_parent_id: null,
    });

    const parentCommentsWithReplies = await Promise.all(
      parentComments.map(async (parentComment) => {
        const replies = await CommentModel.find({
          comment_parent_id: parentComment._id,
        });

        return {
          ...parentComment.toObject(),
          comment_replies: replies,
        };
      })
    );

    return parentCommentsWithReplies;
  }
}

module.exports = new CommentService();
