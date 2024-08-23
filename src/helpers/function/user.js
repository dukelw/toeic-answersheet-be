const { UserModel } = require("../../models/User");

const findByEmail = async ({ email }) => {
  return await UserModel.findOne({ user_email: email });
};

module.exports = {
  findByEmail,
};
