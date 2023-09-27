const { ctrlWrapper, HttpError } = require('../helpers');
const ProductCategory = require('../models/products');

const getAllProducts = async (req, res) => {
  const result = await ProductCategory.find();
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result.slice(0, 500));
};

module.exports = {
  getAllProducts: ctrlWrapper(getAllProducts),
};
