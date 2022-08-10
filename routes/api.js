const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Item = require('../models/cartItem')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../auth")
  
router.get('/users', (req, res, next) => {
    User.find({}).exec()
      .then((data) => res.json(data))
      .catch(next);
});


  
  router.post("/users", (req, res) => {
    // hash the password
    bcrypt
      .hash(req.body.password, 10)
      .then((hashedPassword) => {
        // create a new user instance and collect the data
        const user = new User({
        firstName:req.body.firstName,
          email: req.body.email,
          password: hashedPassword,
        });
  
        // save the new user
        User
          .create(user)
          // return success if the new user is added to the database successfully
          .then((result) => {
            res.status(200).send({
              message: "User Created Successfully",
              result,
            });
            console.log({result})
          })
          // catch error if the new user wasn't added successfully to the database
          .catch((error) => {
            console.log({error})
            res.status(500).send({
              message: "Error creating user",
              error,
            });
          });
      })
      // catch error if the password hash isn't successful
      .catch((e) => {
        console.log(e)
        res.status(500).send({
          message: "Error creating user",
          e,
        });
      });
  });
  

  router.post('/login',(req,res) => {

    User.findOne({ email: req.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(req.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
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
       Item.find({ owner:user._id}).exec(  (err,items) => {
            if(err) return console.log(error)
            res.status(200).send({
                message: "Login Successful",
                id: user._id,
                token,
                items
              });
          })
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
        console.log(e)
      res.status(404).send({
        message: "User does not exist",
        e,
      });
    });
  })

  // free endpoint
router.get("/free-endpoint", (req, res) => {
    res.json({ message: "You are free to access me anytime" });
  });
  
  // authentication endpoint
    router.get("/auth-endpoint",auth, (req, res) => {
    res.json({ message: "You are authorized to access me" });
  })

  router.post("/cart-item",auth,(req,res,next) => {
    if(req.body){
        const item = req.body
        item.owner = req.user.userId
        console.log({item},req.user)
        Item
        .create(item).then((result) => {
            res.status(200).send({
                message: 'Item Added'
            })
            User.findOne({_id:result.owner})
            .populate('User')
        }).catch(error => {
            res.status(500).send({
                message: "Error adding Item",
                error,
              });
              console.log({error})
        })
     }
  })
  
module.exports = router;