const List = require("../../models/List");
const Todo = require("../../models/Todo");
const { BadRequestError, NotFoundError } = require("../../utils/errors");

exports.getTodos = async (req, res) => {
  const limit = Number(req.query?.limit || 10);
  /* 
        Skip the number of projects specified in the "offset"
        query parameter according to default project sorting. 
        If no offset given, default is 0 (aka start from the
        beginning)
      */
  const offset = Number(req.query?.offset || 0);
  const filters = {};

  if (req.query?.listId) filters.project = req.query.listtId;

  // Get all projects; filter according to "limit" and "offset" query params
  const todos = await Todo.find(filters)
    .sort({ createdAt: "desc" })
    .skip(offset)
    .limit(limit);
  const totalTodosInDatabase = await Todo.find(filters).countDocuments();
  // Get total number of projects available in database

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
};

exports.getTodoById = async (req, res) => {
  // Big outer try-catch

  // Get our project id (put in local variable)
  const todoId = req.params.todoId;

  // Find project with that id
  const todo = await Todo.findById(todoId);

  // IF(no project) return 404
  if (!ticket) throw new NotFoundError("That ticket does not exist...");

  return res.json(ticket);
};

exports.createTodo = async (req, res) => {
  // Get data from req.body and place in local variables
  const name = req.body.name || "";
  const description = req.body.description || "";
  const listId = req.body.listId;

  // If (no name || name is empty string) respond bad request
  if (!name) {
    throw new BadRequestError(
      "You must include a name and list id for your todo..."
    );
  }

  const listExists = await List.exists({ _id: listId });
  if (!listExists) {
    throw new BadRequestError(
      `There is no list with the id ${listId}. Please enter a valid list id...`
    );
  }

  const newTodo = await Todo.create({
    name: name,
    description: description,
    list: listId,
  });

  // Respond
  // prettier-ignore
  return res
    .setHeader('Location', `/api/v1/tickets/${newTodo._id.toString()}`)
    .status(201)
    .json(newTodo)
};

exports.updateTodoById = async (req, res) => {
  const todoId = req.params.id;

  const newName = req.body?.name;
  const newDescription = req.body?.description;

  const todo = await Todo.findById(todoId);
  if (!todo) throw new NotFoundError("That todo does not exist...");

  if (newName) ticket.name = newName;
  if (newDescription) todo.description = newDescription;

  const updatedTodo = await todo.save();
  return res.status(200).json(updatedTodo);
};

exports.deleteTodoById = async (req, res) => {
  const todoId = req.params.id;

  const todoToDelete = await Todo.findById(todoId);
  if (!todoToDelete) throw new NotFoundError("That todo does not exist...");

  await todoToDelete.delete();

  return res.sendStatus(204);
};
