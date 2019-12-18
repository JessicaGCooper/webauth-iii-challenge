const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/users", restricted, checkDept("Finance"), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function checkDept(department) {
    return function(req, res, next) {
      if (req.token && role === req.token.department) {
        next();
      } else {
        res
          .status(403)
          .json({ message: `You have no power here, you must be a team member of the ${department} department` });
      }
    };
  }
  

module.exports = router;