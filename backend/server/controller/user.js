const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = (db) => {
  return {
    signup: (req, res) => {
      const { first_name, last_name, email, password } = req.body;
      const data = {
        first_name,
        last_name,
        email,
        password: bcrypt.hashSync(password, 8),
      };

      db.user
        .create(data)
        .then((result) => {
          let token = jwt.sign(result.toJSON(), "upskill-node", {
            expiresIn: 86400, // 24 hours
          });
          res.status(201).send({
            token,
            statusCode: 201,
            status: "ok",
            message: "User has been created successfully!",
          });
        })
        .catch((err) => res.status(400).send(err));
    },

    signin: (req, res) => {
      db.user
        .findOne({
          where: {
            email: req.body.email,
          },
        })
        .then((user) => {
          if (!user) {
            return res.status(404).send({
              message: "User not found!",
              status: "error",
              statusCode: 404,
              token: null,
            });
          }
          let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );
          if (!passwordIsValid) {
            return res.status(401).send({
              message: "Invalid user or password!",
              status: "error",
              statusCode: 404,
              token: null,
            });
          }
          let token = jwt.sign(user.toJSON(), "upskill-node", {
            expiresIn: 86400, // 24 hours
          });
          res.status(200).send({
            message: "User logged in successfully!",
            status: "ok",
            statusCode: 200,
            token,
          });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    },
  };
};
