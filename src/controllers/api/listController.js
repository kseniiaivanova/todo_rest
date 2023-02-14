const List = require("../../models/List");
const { BadRequestError, NotFoundError } = require("../../utils/errors");

exports.getLists = async (req, res) => {
  const limit = Number(req.query?.limit) || 10;
  const offset = Number(req.query?.offset) || 0;

  const lists = await List.find()
    .sort({ createdAt: "desc" })
    .skip(offset)
    .limit(limit);
  const totalLists = await List.countDocuments();

  return res.json({
    lists: lists,
    meta: {
      total: totalLists,
      limit: limit,
      offset: offset,
      count: lists.length,
    },
  });
};

exports.getListById = async (req, res) => {
  const listId = req.params.id;

  const list = await List.findById(listId);
  if (!list) throw new NotFoundError("That list does not exist...");

  return res.json(project);
};

exports.createList = async (req, res) => {
  const newListName = req.body?.name;
  const newListDescription = req.body?.description || "";

  if (!newListName || newListName.toString().length === 0) {
    throw new BadRequestError("You must provide a name for your list...");
  }

  const newList = await List.create({
    name: newListName,
    description: newListDescription,
  });

  // prettier-ignore
  return res
		.setHeader('Location', `/api/v1/lists/${newList._id.toString()}`)
		.status(201)
		.json(newList)
};

exports.updateListById = async (req, res) => {
  const listId = req.params.id;
  const newName = req.body?.name;
  const newDescription = req.body?.description;

  if (!newName && !newDescription) {
    throw new BadRequestError(
      "You must provide either a new list name or new list description"
    );
  }

  const list = await List.findById(listId);
  if (!list) throw new NotFoundError("That list does not exist...");

  // Sending back updated object is a preference but not required
  // NOTE: Good to send back object if server side logic is applied...
  // ...that adds/changes information client does not know the result of.
  /*
		if (newName) project.name = newName
		if (newDescription) project.description = newDescription
		const response = await project.save() // NOTE: Runs validators...
		return res.status(200).json(response)
		*/

  await list.update({ ...req.body }, { runValidators: true });
  return res.sendStatus(204);
};

exports.deleteListById = async (req, res) => {
  const listId = req.params.id;

  const listToDelete = await List.findById(listId);
  if (!listToDelete) throw new NotFoundError("That list does not exist...");

  await listToDelete.delete();

  return res.sendStatus(204);
};
