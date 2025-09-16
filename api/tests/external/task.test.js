const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");

const app = "http://localhost:4000";

describe("Testes REST de Tarefas", function () {
  let token = "";
  let taskId = "";

  const testUser = {
    username: "usuarioTarefas",
    password: "123456"
  };

  const testTask = {
    title: "Comprar pão"
  };

  before(async function () {
    await request(app).post("/api/register").send(testUser);

    const loginRes = await request(app).post("/api/login").send(testUser);
    expect(loginRes.status).to.equal(200);
    token = loginRes.body.token;
  });

  it("Deve criar uma nova tarefa", async function () {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send(testTask);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("title", testTask.title);
    expect(res.body).to.have.property("completed", false);
    expect(res.body).to.have.property("id");
    taskId = res.body.id;
  });

  it("Deve listar as tarefas do usuário", async function () {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    const task = res.body.find(t => t.id === taskId);
    expect(task).to.exist;
    expect(task).to.have.property("title", testTask.title);
  });

  it("Deve marcar a tarefa como concluída", async function () {
    const res = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ completed: true });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("completed", true);
  });

  it("Deve deletar a tarefa", async function () {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message").that.includes("deletada");
  });
});
