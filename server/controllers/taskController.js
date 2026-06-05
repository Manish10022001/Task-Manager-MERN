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

module.exports = { createTask, getTasks };
