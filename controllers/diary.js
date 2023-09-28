const { Product } = require('../models/diaryProduct');
const { diaryExercise } = require('../models/diaryExercise');
const { ctrlWrapper, HttpError } = require('../helpers');

const addProduct = async (req, res) => {
  const { _id: owner } = req.user;
  const {
    date,
    productId,
    calories,
    category,
    recommended,
    title,
    amount,
    weight,
  } = req.body;

  const oldResult = await Product.find({ date, productId, owner });
  
  if (oldResult.length === 0) {
    const newDiaryProduct = await Product.create({ ...req.body, owner });
    res.status(201).json(newDiaryProduct);
  } else {
    const updateData = {
      $set: {
        calories: Number(calories) + Number(oldResult[0]['calories']),
        category,
        recommended,
        title,
        amount: Number(amount) + Number(oldResult[0]['amount']),
        weight: Number(weight) + Number(oldResult[0]['weight']),
      },
    };
	 
    const result = await Product.findOneAndUpdate(
      { date, productId, owner },
      updateData,
      { new: true }
    );
	 console.log(result)
    res.status(200).json(result);
  }
};

const getProduct = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query;
  const filter = { date, owner };
  const products = await Product.find(filter);
  if (!products) {
    throw HttpError(204, 'There are no entries in the diary for this date');
  }
  res.json(products);
};

const deleteProduct = async (req, res) => {
  const { id } = req.body;
  const product = await Product.findByIdAndDelete({
    _id: id,
  });
  if (!product) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({ message: 'Product deleted' });
};

const addExercise = async (req, res) => {
  const { _id: owner } = req.user;
  const {
    exerciseId,
    date,
    time,
    burnedCalories,
    bodyPart,
    equipment,
    name,
    target,
  } = req.body;

  const oldResult = await diaryExercise.find({ date, exerciseId, owner });
  if (oldResult.length === 0) {
    const newDiaryExercise = await diaryExercise.create({ ...req.body, owner });
    res.status(201).json(newDiaryExercise);
  } else {
    const updateData = {
      $set: {
        time: time + oldResult[0]['time'],
        burnedCalories: burnedCalories + oldResult[0]['burnedCalories'],
        bodyPart,
        equipment,
        name,
        target,
      },
    };
    const result = await diaryExercise.findOneAndUpdate(
      { date, exerciseId, owner },
      updateData,
      { new: true }
    );
    res.status(200).json(result);
  }
};

const getExercise = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query;
  const filter = { date, owner };
  const exercises = await diaryExercise.find(filter);
  if (!exercises) {
    throw HttpError(204, 'There are no entries in the diary for this date');
  }
  res.json(exercises);
};

const deleteExercise = async (req, res) => {
  const { id } = req.body;
  const exercise = await diaryExercise.findByIdAndDelete({
    _id: id,
  });
  if (!exercise) {
    throw HttpError(404, 'Not found');
  }
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
