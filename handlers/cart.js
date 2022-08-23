const User = require("../models/users");
const Item = require("../models/cartItem");

const cart = async (req, res, next) => {
  if (req.body) {
    const item = req.body;
    item.owner = req.user.userId;
    const oldItem = await Item.findOne({ name: item.name });
    if (oldItem) {
      try {
        const result = await oldItem.updateOne(
          { quantity: item.quantity, price: item.price },
          { $set: oldItem }
        );
        return res.status(200).send({
          message: "Cart Updated",
        });
      } catch (err) {
        console.log(err);
        res.status(500);
      }
    }

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
