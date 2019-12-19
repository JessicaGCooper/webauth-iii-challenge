const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password, department } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // sign token
        const token = signToken(user); 

        // send the token
        res.status(200).json({
          token, // added token as part of the response sent
          message: `Welcome ${user.username}!`,
        });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// this functions creates and signs the token
function signToken(user) {
  const payload = {
    username: user.username,
    department: user.department
  };

  const secret = process.env.JWT_SECRET || "The little boy jumped to see such fun, & the dish ran away with the spoon!";

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options); // notice the return
}

module.exports = router;
