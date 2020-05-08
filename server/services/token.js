var jwt = require("jsonwebtoken");
var User = require("../models/User");
var UserType = require("../models/UserType");

//Generating new token if exists but was expired
const checkToken = async (token) => {
  let _id = null;
  try {
    const { id } = await jwt.decode(token);
    _id = id;
  } catch (error) {
    return false;
  }
  const user = await await User.findOne({
    where: { id: _id },
    include: [UserType],
  });
  if (user) {
    const token = jwt.sign({ id: _id }, "secret", { expiresIn: "1d" });
    return {
      token,
      type: user.usertype.name,
    };
  } else {
    return false;
  }
};

const token = {
  encode: async (id, type, username) => {
    const token = jwt.sign(
      { id: id, type: type, username: username },
      "secret",
      {
        expiresIn: "1d",
      }
    );
    return token;
  },
  decode: async (token) => {
    try {
      const { id } = await jwt.verify(token, "secret");
      const user = await models.User.findOne({ id: id });
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (error) {
      const newToken = await checkToken(token);
      return newToken;
    }
  },
};

module.exports = token;
