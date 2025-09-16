const { tasks } = require("../../models/taskModel");

function createTask(req, res) {
  const { title } = req.body;
  const userId = req.user.id;

  if (!title) return res.status(400).json({ message: "Título obrigatório" });

  const openTasks = tasks.filter(t => t.userId === userId && !t.completed);
  if (openTasks.length >= 10) {
    return res.status(400).json({ message: "Limite de 10 tarefas abertas atingido" });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false,
    userId,
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
}

function listTasks(req, res) {
  const userId = req.user.id;
  const userTasks = tasks.filter(t => t.userId === userId);
  return res.status(200).json(userTasks);
}

function completeTask(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  const task = tasks.find(t => t.id == id && t.userId === userId);
  if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });

  task.completed = true;
  return res.status(200).json(task);
}

function deleteTask(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  const taskIndex = tasks.findIndex(t => t.id == id && t.userId === userId);
  if (taskIndex === -1) return res.status(404).json({ message: "Tarefa não encontrada" });

  tasks.splice(taskIndex, 1);
  return res.status(200).json({ message: "Tarefa deletada com sucesso" });
}

module.exports = {
  createTask,
  listTasks,
  completeTask,
  deleteTask,
};
