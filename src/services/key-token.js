const KeyTokenModel = require("../models/KeyToken");

class KeyTokenService {
  createKeyToken = async ({
    user_id,
    public_key,
    private_key,
    refresh_token,
  }) => {
    try {
      const filter = { user: user_id },
        update = {
          privateKey: private_key,
          publicKey: public_key,
          refreshTokenUsed: [],
          refreshToken: refresh_token,
        },
        options = { upsert: true, new: true };

      const tokens = await KeyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      console.log(`Public key created: ${tokens.publicKey}`);
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      console.error(error);
    }
  };

  findByUserID = async (user_id) => {
    return await KeyTokenModel.findOne({ user: user_id });
  };

  removeKeyByID = async (id) => {
    return await KeyTokenModel.deleteOne({ _id: id });
  };

  deleteKeyByUserID = async (user_id) => {
    return await KeyTokenModel.deleteOne({
      user: user_id,
    });
  };
}

module.exports = new KeyTokenService();
