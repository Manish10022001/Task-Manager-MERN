const Task = require("../models/Task");

//post api/tasks -> create task
const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    //validate if title is given
    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const task = await Task.create({
      title,
      description,
      userId: req.user.id, //this is from jwt middleware
    });

    res.status(201).json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later" });
  }
};

module.exports = { createTask };
