const bcrypt = require("bcrypt");
const User = require("../models/users");

const user = (req, res) => {
  // hash the password

  bcrypt

    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        firstName: req.body.firstName,
        email: req.body.email,
        password: hashedPassword,
      });

      // save the new user
      User.create(user)
        // return success if the new user is added to the database successfully
        .then((result) => {
          res.status(200).send({
            message: "User Created Successfully",
            result,
          });
          console.log({ result });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          console.log({ error });
          res.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      console.log(e);
      res.status(500).send({
        message: "No password was found",
        e,
      });
    });
};

module.exports = user;
