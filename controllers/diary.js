const { Product } = require('../models/diaryProduct');
const { diaryExercise } = require('../models/diaryExercise');

const { ctrlWrapper, HttpError } = require('../helpers');

const addProduct = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Product.create({ ...req.body, owner });
  res.status(201).json(result);
};

const getProduct = async (req, res) => {
  const { _id: owner } = req.user;
  const products = await Product.find({ owner, productId: { $exists: true } });
  res.json(products);
};

const deleteProduct = async (req, res) => {
  const data = req.body;
  const { _id: owner } = req.user;

  const existingProduct = await Product.findOne({
    data,
    owner,
    productId: { $exists: true },
  });
  if (!existingProduct) {
    throw HttpError(404, 'Not found');
  }
  await Product.findByIdAndDelete(existingProduct._id);
  res.status(200).json({ message: 'Product deleted' });
};

const addExercise = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await diaryExercise.create({ ...req.body, owner });
  res.status(201).json(result);
};

const getExercise = async (req, res) => {
  const { _id: owner } = req.user;
  const products = await diaryExercise.find({
    owner,
    exerciseId: { $exists: true },
  });
  res.json(products);
};

const deleteExercise = async (req, res) => {
  const data = req.body;
  const { _id: owner } = req.user;

  const doneExercise = await diaryExercise.findOne({
    data,
    owner,
    exerciseId: { $exists: true },
  });
  if (!doneExercise) {
    throw HttpError(404, 'Not found');
  }
  await diaryExercise.findByIdAndDelete(doneExercise._id);
  res.status(200).json({ message: 'Exercise deleted' });
};

module.exports = {
  addProduct: ctrlWrapper(addProduct),
  deleteProduct: ctrlWrapper(deleteProduct),
  addExercise: ctrlWrapper(addExercise),
  deleteExercise: ctrlWrapper(deleteExercise),
  getProduct: ctrlWrapper(getProduct),
  getExercise: ctrlWrapper(getExercise),
};
