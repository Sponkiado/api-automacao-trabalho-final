const request = require("supertest");
const { expect } = require("chai");
const app = "http://localhost:4000";

let token;
let taskId;

describe("GraphQL API", () => {
  before(async () => {
    const query = `
      mutation {
        registerUser(username: "usuario1", password: "senha123")
      }
    `;

    await request(app)
      .post("/graphql")
      .send({ query });
  });

  it("Login válido", async () => {
    const query = `
      mutation {
        loginUser(username: "usuario1", password: "senha123") {
          token
        }
      }
    `;

    const res = await request(app)
      .post("/graphql")
      .send({ query });

    expect(res.status).to.equal(200);
    expect(res.body.data.loginUser.token).to.be.a("string");

    token = res.body.data.loginUser.token;
  });

  it("Login inválido", async () => {
    const query = `
      mutation {
        loginUser(username: "usuario1", password: "senhaErrada") {
          token
        }
      }
    `;

    const res = await request(app)
      .post("/graphql")
      .send({ query });

    expect(res.status).to.equal(200);
    expect(res.body.errors).to.exist;
  });

  it("Criação de tarefa válida", async () => {
    const query = `
      mutation {
        createTask(title: "Nova tarefa") {
          id
          title
          completed
        }
      }
    `;

    const res = await request(app)
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({ query });

    expect(res.status).to.equal(200);
    expect(res.body.data.createTask.title).to.equal("Nova tarefa");
    expect(res.body.data.createTask.completed).to.be.false;

    taskId = res.body.data.createTask.id;
  });

  it("Marcar tarefa como concluída", async () => {
    const query = `
      mutation {
        completeTask(id: ${taskId}) {
          id
          completed
        }
      }
    `;

    const res = await request(app)
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({ query });

    expect(res.status).to.equal(200);
    expect(res.body.data.completeTask.completed).to.be.true;
  });

  it("Deletar tarefa", async () => {
    const query = `
      mutation {
        deleteTask(id: ${taskId})
      }
    `;

    const res = await request(app)
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({ query });

    expect(res.status).to.equal(200);
    expect(res.body.data.deleteTask).to.equal("Tarefa deletada com sucesso");
  });
});
