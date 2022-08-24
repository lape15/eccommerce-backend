const User = require("../models/users");
const Item = require("../models/cartItem");

const deleteCart = async (req, res, next) => {
  if (req.body) {
    const itemId = req.body.id;
    const owner = req.user.userId;

    try {
      const item = await Item.findOne({ _id: itemId, owner });
      item.quantity = item.quantity - 1;
      if (item.quantity == 0) {
        const deleted = await Item.deleteOne({ _id: itemId, owner });
        res.status(200).send("Gone");
        return;
      }
      const result = await item.updateOne(
        { quantity: item.quantity },
        { $set: item }
      );
      res.status(200).send({ message: "Deleted", item });
      console.log(item, { result });
    } catch (err) {
      res.status(500).send({ message: "Unable to delete cart Item" });
    }
  }
};

module.exports = deleteCart;
