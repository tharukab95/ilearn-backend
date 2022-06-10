const Category = require("../model/Category");

const getCategories = async (req, res) => {
  let { page, size, sort, ...filter } = req.query;

  if (!page) page = 1;
  if (!size) size = 15;
  if (!sort) sort = 1;

  const limit = parseInt(size);
  const skip = (page - 1) * size;

  const result = await Category.find(filter)
    .sort({ createdAt: sort })
    .limit(limit)
    .skip(skip);

  if (!result) return res.status(204).json({ message: "No Categories found." });

  res.status(200).json({ data: result });
};

const createCategory = async (req, res) => {
  const category = new Category({
    ...req.body,
  });

  const result = await category.save();
  res.status(201).json(result);
};

const updateCategory = async (req, res) => {
  const { id, ...updateParameters } = req.body;
  if (!id) {
    return res.status(400).json({ message: "ID parameter is required." });
  } else if (!updateParameters) {
    return res.status(400).json({ message: "Updated fields not present." });
  }

  const Category = await Category.findById(id);
  if (!Category) {
    return res.status(204).json({ message: `No Category matches ID ${id}.` });
  } else {
    res.Category = updateParameters;
  }

  const result = await res.Category.save();
  res.json(result);
};

const deleteCategory = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Category ID required." });
  }

  const Category = await Category.findById(id);
  if (!Category) {
    return res.status(204).json({ message: `No Category matches ID ${id}.` });
  }
  await Category.remove();
  res.json({ message: "Deleted Category" });
};

const getCategory = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Category ID required." });
  }

  const Category = await Category.findById(id);
  if (!Category) {
    return res.status(204).json({ message: `No Category matches ID ${id}.` });
  }
  res.json(Category);
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
};
