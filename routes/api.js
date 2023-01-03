const express = require("express");
const router = express.Router();
const User = require("../models/users");
const auth = require("../auth");
const postUser = require("../handlers/user");
const login = require("../handlers/login");
const cart = require("../handlers/cart");
const deleteCart = require("../handlers/deleteCart");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oidc");
const passport = require("passport");

router.get("/users", (req, res, next) => {
  User.find({})
    .exec()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

router.post("/users", postUser);

router.post("/login", login);

// free endpoint
router.get("/free-endpoint", (req, res) => {
  res.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
router.get("/auth-endpoint", auth, (req, res) => {
  res.json({ message: "You are authorized to access me" });
});

router.post("/cart", auth, cart);
router.delete("/cart", auth, deleteCart);
router.get("/login/federated/google", (res, req) => {
  passport.authenticate("google");
  req.status(200).send({
    message: "ok",
  });
});

module.exports = router;
