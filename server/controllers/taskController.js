const Task = require("../models/Task");

//get api/ -> get all tasks
const getTasks = async (req, res) => {
  // get all tasks of logged in user
  const tasks = await Task.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });

  res.status(200).json(tasks);
};

//post api/tasks -> create task
const createTask = async (req, res) => {
  const { title, description } = req.body;

  //validate if title is given
  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  //create task in db
  const task = await Task.create({
    title,
    description,
    userId: req.user.id, //this is from jwt middleware
  });

  res.status(201).json(task);
};

//put api/update/:id -> upadte (title, description)
const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  if (task.userId.toString() !== req.user.id)
    return res.status(403).json({
      message: "Not authorized",
    });

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title || task.title, //it keeps old if new not given
      description: req.body.description ?? task.description, //same here
      status: req.body.status || task.status,
    },
    { returnDocument: "after" }
  );
  res.status(200).json(updatedTask);
};

//patch - update status only
const toggleTaskStatus = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task)
    return res.status(404).json({
      message: "Task not found",
    });
  if (task.userId.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { returnDocument: "after" }
  );
  res.status(200).json(updatedTask);
};
module.exports = { createTask, getTasks, updateTask, toggleTaskStatus };
