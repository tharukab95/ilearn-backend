const Product = require("../model/Product");

const getProducts = async (req, res) => {
  let { page, size, sort, ...filter } = req.query;

  if (!page) page = 1;
  if (!size) size = 15;
  if (!sort) sort = 1;

  const limit = parseInt(size);
  const skip = (page - 1) * size;

  const result = await Product.find(filter)
    .sort({ createdAt: parseInt(sort) })
    .limit(limit)
    .skip(skip);

  if (!result) return res.status(204).json({ message: "No products found." });

  res.status(200).json({ data: result });
};

const createProduct = async (req, res) => {
  const product = new Product({
    ...req.body,
  });

  const result = await product.save();
  res.status(201).json(result);
};

const updateProduct = async (req, res) => {
  const { id, ...updateParameters } = req.body;
  if (!id) {
    return res.status(400).json({ message: "ID parameter is required." });
  } else if (!updateParameters) {
    return res.status(400).json({ message: "Updated fields not present." });
  }

  const product = await Product.findById(id);
  if (!product) {
    return res.status(204).json({ message: `No product matches ID ${id}.` });
  } else {
    res.product = updateParameters;
  }

  const result = await res.product.save();
  res.json(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Product ID required." });
  }

  const product = await Product.findById(id);
  if (!product) {
    return res.status(204).json({ message: `No product matches ID ${id}.` });
  }
  await product.remove();
  res.json({ message: "Deleted Product" });
};

const getProduct = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Product ID required." });
  }

  const product = await Product.findById(id);
  if (!product) {
    return res.status(204).json({ message: `No product matches ID ${id}.` });
  }
  res.json(product);
};

const searchProducts = async (req, res) => {
  let { term, limit } = req.query;
  if (!term) term = "";
  if (!limit) limit = 8;

  const result = await Product.aggregate([
    {
      $search: {
        index: "default",
        autocomplete: {
          path: "name",
          query: term,
          fuzzy: {
            maxEdits: 2,
          },
        },
      },
    },
  ]).limit(limit);

  if (!result) {
    return res.status(204).json({ message: `No products found.` });
  }

  res.status(200).json({ data: result });
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  searchProducts,
};
