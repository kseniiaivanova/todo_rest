const Todo = require("../models/todo");

exports.getAllTodos = async (req, res) => {
  try {
    /* 
        Get only number of projects specified in "limit" query
        parameter. Default limit is 10 (aka unless told otherwise
        only get 10 projects at a time)
      */
    const limit = Number(req.query?.limit || 10);
    /* 
        Skip the number of projects specified in the "offset"
        query parameter according to default project sorting. 
        If no offset given, default is 0 (aka start from the
        beginning)
      */
    const offset = Number(req.query?.offset || 0);

    // Get all projects; filter according to "limit" and "offset" query params
    const todos = await Todo.find().limit(limit).skip(offset);
    // Get total number of projects available in database
    const totalTodosInDatabase = await Todo.countDocuments();
    // Create and send our response
    return res.json({
      data: todos, // Send projects result
      meta: {
        // meta information about request
        total: totalTodosInDatabase, // Total num projects available in db
        limit: limit, // Num of projects asked for
        offset: offset, // Num or projects asked to skip
        count: todos.length, // Num of projects sent back
      },
    });
    // Catch any unforseen errors
  } catch (error) {
    console.error(error);
    // Send the following response if error occurred
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getTodoById = async (req, res) => {
  // Big outer try-catch
  try {
    // Get our project id (put in local variable)
    const todoId = req.params.todoId;

    // Find project with that id
    const todo = await Todo.findById(todoId);

    // IF(no project) return 404
    if (!todo) return res.sendStatus(404);

    // respond with project data (200 OK)
    return res.json(todo);
  } catch (error) {
    console.error(error);
    // Send the following response if error occurred
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.createNewTodo = async (req, res) => {
  try {
    // Get data from req.body and place in local variables
    const name = req.body.name || "";
    const description = req.body.description || "";

    // If (no name || name is empty string) respond bad request
    if (!name) {
      return res.status(400).json({
        message: "You must provide a todo name",
      });
    }

    // Create project
    const newTodo = await Todo.create({
      name: name,
      description: description,
    });

    // Respond
    // prettier-ignore
    return res
        // Add Location header to response
        // Location header = URI pointing to endpoint where user can get new project
        .setHeader(
          'Location', 
          `http://localhost:${process.env.PORT}/api/v1/todos/${newProject._id}`
        )
        .status(201)
        .json(newTodo)
  } catch (error) {
    console.error(error);
    // Send the following response if error occurred
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateTodoById = async (req, res) => {
  try {
    // Place project id in local variable
    const todoId = req.params.todoId;

    // Place name and description from req.body in local variables
    const { name, description } = req.body;

    // If no name && description respond with Bad Request
    if (!name && !description) {
      return res.status(400).json({
        message: "You must provide a name or a description to update...",
      });
    }

    // Get project
    const todoToUpdate = await Todo.findById(todoId);

    // If (no project) respond with Not Found
    if (!todoToUpdate) return res.sendStatus(404);

    // Update project
    if (name) todoToUpdate.name = name;
    if (description) todoToUpdate.description = description;
    const updatedTodo = await todoToUpdate.save();

    // Craft response (return updated project)
    return res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteTodoById = async (req, res) => {
  try {
    // Get project id and place in local variable
    const todoId = req.params.todoId;
    // Check if project exists
    const todoToDelete = await Todo.findById(todoId);
    // IF (no project) return Not Found
    if (!todoToDelete) return res.sendStatus(404);

    // Delete project
    await todoToDelete.delete();

    // Craft our response
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
