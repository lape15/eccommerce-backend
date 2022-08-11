const User = require("../models/users");
const Item = require("../models/cartItem");

const cart = (req, res, next) => {
  if (req.body) {
    const item = req.body;
    item.owner = req.user.userId;
    console.log({ item }, req.user);
    Item.create(item)
      .then((result) => {
        res.status(200).send({
          message: "Item Added",
        });
        User.findOne({ _id: result.owner }).populate("User");
      })
      .catch((error) => {
        res.status(500).send({
          message: "Error adding Item",
          error,
        });
      });
  }
};

module.exports = cart;
