const commentService = require("../services/comment");
const { SuccessResponse } = require("../core/success-response");

class CommentController {
  // Create
  async create(req, res, next) {
    new SuccessResponse({
      message: "Create new comment successfully",
      metadata: await commentService.createComment(req.body),
    }).send(res);
  }

  // Get comment by parent id
  async getCommentByParentID(req, res, next) {
    new SuccessResponse({
      message: "Get comment by parent ID successfully",
      metadata: await commentService.getCommentByParentID(req.query),
    }).send(res);
  }

  // Get comment of product
  async getParentCommentOfAnswer(req, res, next) {
    const answerID = req.params.id;
    new SuccessResponse({
      message: "Get comment of product successfully",
      metadata: await commentService.getParentCommentOfAnswer(answerID),
    }).send(res);
  }

  async delete(req, res, next) {
    console.log("Body:::::::::::::::::::", req.body);
    new SuccessResponse({
      message: "Delete comment successfully",
      metadata: await commentService.deleteComment(req.body),
    }).send(res);
  }
}

module.exports = new CommentController();
