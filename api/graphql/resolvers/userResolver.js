const { users } = require("../../models/userModel");
const jwt = require("jsonwebtoken");

const SECRET = "segredo123";

const userResolver = {
  Query: {
    users: () => users,
  },
  Mutation: {
    registerUser: (_, { username, password }) => {
      const existing = users.find((u) => u.username === username);
      if (existing) throw new Error("Usuário já existe");

      const newUser = {
        id: users.length + 1,
        username,
        password,
      };
      users.push(newUser);
      return "Usuário registrado com sucesso";
    },

    loginUser: (_, { username, password }) => {
      const user = users.find((u) => u.username === username);
      if (!user) throw new Error("Credenciais inválidas");

      if (password !== user.password) throw new Error("Credenciais inválidas");

      const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });
      return { token };
    },
  },
};

module.exports = userResolver;
