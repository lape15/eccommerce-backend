const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Item = require("../models/cartItem");

const login = (req, res) => {
  console.log({ req });
  User.findOne({ email: req.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(req.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return res.status(400).send({
              message: "Password is incorrect",
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          Item.find({ owner: user._id }).exec((err, items) => {
            if (err) return console.log(error);
            res.status(200).send({
              message: "Login Successful",
              id: user._id,
              token,
              items,
            });
          });
          //   return success res
        })
        // catch error if password does not match
        .catch((error) => {
          res.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      console.log(e);
      res.status(404).send({
        message: "User does not exist",
        e,
      });
    });
};

module.exports = login;
