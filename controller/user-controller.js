const cache = require("./cache-controller");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const User = require("../models").User;

const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  list(req, res) {
    // if (!req.user) {
    //   return res.status(400).send({ message: "Please login!" });
    // } else {

    // }
    return User.findAll({
      order: [["email", "ASC"]],
      //   attributes: ["id", "email", "name", "api_key"],
    })
      .then((users) => res.status(200).send(users))
      .catch((error) => {
        console.error(error.message);
        return res.status(400).send(error.message);
      });
  },

  create(req, res) {
    // if (!req.user) {
    //   return res.status(400).send({ message: "Please login!" });
    // } else {
    // }

    const { email, password, name, birthday, sex } = req.body;
    console.log(new Date(birthday));
    bcrypt.hash(password, saltRounds, function (err, hash) {
      return User.create({
        email: email,
        password: hash,
        name: name,
        birthday: new Date(birthday),
        sex: sex,
      })
        .then((user) =>
          res
            .status(201)
            .send({ id: user.id, email: user.email, name: user.name })
        )
        .catch((err) => {
          try {
            console.log(err.original.code);
            if (err.original.code === "23505")
              return res
                .status(400)
                .send({ message: "Email is already exists!" });
          } catch (error) {
            res.status(400).send(err.message);
          }
        });
    });
  },

  login(req, res) {
    const { email, password } = req.body;
    const user = User.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "Incorrect username or password!",
          });
        }

        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            const token = user.generateToken();
            cache.set(user.email + config.cacheKey, {
              id: user.id,
              token: token,
            });
            return res.header("authorization", token).status(200).send({
              id: user.id,
              name: user.name,
              email: user.email,
              token: token,
            });
          } else {
            return res
              .status(401)
              .send({ message: "Incorrect username or password!" });
          }
        });
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    const { id } = req.body;
    return User.findByPk(id).then((user) => {
      if (!user) return res.status(400).send({ message: "User not found" });

      return user
        .destroy()
        .then(() => cache.delete(user.email + config.cacheKey))
        .then(() => res.status(204).send({ message: "deleted" }))
        .catch((error) => res.status(400).send(error));
    });
  },

  update(req, res) {
    const { email, password, name, birthday, sex, api_key } = req.body;
    if (password !== null) {
      bcrypt.hash(password, saltRounds, (error, hash) => {
        return User.findOne({
          where: { email: email },
        })
          .then((user) => {
            if (!user)
              return res
                .status(400)
                .send({ status: "fail", message: "User not found" });

            return user
              .update({
                password: hash,
                name: name,
                birthday: new Date(birthday),
                sex: sex,
                api_key: api_key,
              })
              .then(() => cache.delete(user.email + config.cacheKey))
              .then(() =>
                res.status(200).send({
                  status: "succeed",
                  message: `User ${user.email} updated succeed`,
                })
              );
          })
          .catch((error) =>
            res.status(400).send({ status: "fail", message: error.message })
          );
      });
    } else {
      User.findOne({
        where: { email: email },
      })
        .then((user) => {
          if (!user)
            return res
              .status(400)
              .send({ status: "fail", message: "User not found" });

          return user
            .update({
              name: name,
              birthday: new Date(birthday),
              sex: sex,
              api_key: api_key,
            })
            .then(() => cache.delete(user.email + config.cacheKey))
            .then(() =>
              res.status(200).send({
                status: "succeed",
                message: `User ${user.email} updated succeed`,
              })
            );
        })
        .catch((error) =>
          res.status(400).send({ status: "fail", message: error.message })
        );
    }
  },
};
