const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");

const app = "http://localhost:4000";

describe("Testes REST de Usuários", function () {
  let token = "";

  const testUser = {
    username: "teste1",
    password: "123456"
  };

  it("Deve registrar um novo usuário", async function () {
    const res = await request(app)
      .post("/api/register")
      .send(testUser);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("message", "Usuário registrado com sucesso");
  });

  it("Deve fazer login e retornar token JWT", async function () {
    const res = await request(app)
      .post("/api/login")
      .send(testUser);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
    token = res.body.token;
  });

  it("Token deve ser uma string não vazia", function () {
    expect(token).to.be.a("string").and.to.not.be.empty;
  });
});
