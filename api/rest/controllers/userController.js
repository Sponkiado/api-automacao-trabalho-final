const jwt = require("jsonwebtoken");
const { users } = require("../../models/userModel");

const SECRET = "segredo123";

function register(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Usuário e senha obrigatórios" });
  }

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Usuário já existe" });
  }

  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);

  return res.status(201).json({ message: "Usuário registrado com sucesso" });
}

function login(req, res) {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
    expiresIn: "1h",
  });

  return res.json({ token });
}

module.exports = {
  register,
  login,
  SECRET,
};
