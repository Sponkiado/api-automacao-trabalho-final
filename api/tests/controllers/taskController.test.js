const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const taskController = require("../../../api/rest/controllers/taskController");
const { tasks } = require("../../../api/models/taskModel");

describe("Testes Controller de Tarefas", function () {
  let req;
  let res;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    tasks.length = 0;

    req = { user: { id: 1 } };
    res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub()
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("Deve criar uma nova tarefa", function () {
    req.body = { title: "Nova tarefa" };
    taskController.createTask(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    const response = res.json.firstCall.args[0];
    expect(response).to.have.property("id");
    expect(response).to.have.property("title", "Nova tarefa");
    expect(response).to.have.property("completed", false);
  });

  it("Deve listar tarefas do usuário", function () {
    tasks.push({ id: 1, title: "Teste list", completed: false, userId: 1 });

    taskController.listTasks(req, res);

    expect(res.status.calledWith(200) || !res.status.called).to.be.true;
    const response = res.json.firstCall.args[0];
    expect(response).to.be.an("array");
    expect(response[0]).to.have.property("title", "Teste list");
  });

  it("Deve marcar a tarefa como concluída", function () {
    tasks.push({ id: 2, title: "Teste complete", completed: false, userId: 1 });
    req.params = { id: 2 };

    taskController.completeTask(req, res);

    const response = res.json.firstCall.args[0];
    expect(response).to.have.property("completed", true);
  });

  it("Deve deletar uma tarefa", function () {
    tasks.push({ id: 3, title: "Teste delete", completed: false, userId: 1 });
    req.params = { id: 3 };

    taskController.deleteTask(req, res);

    const response = res.json.firstCall.args[0];
    expect(response).to.have.property("message").that.includes("deletada");
  });
});
