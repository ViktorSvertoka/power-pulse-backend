const { Product } = require('../models/diaryProduct');
const { diaryExercise } = require('../models/diaryExercise');

const { ctrlWrapper, HttpError } = require('../helpers');
const { delProduct, schemasDelProduct } = require('../models/diaryDelProduct');

const addProduct = async (req, res) => {
  const { _id: owner } = req.user;
  const { date, productId, calories, category, recommended, title, amount } =
    req.body;

  const updateData = {
    $set: {
      calories,
      category,
      recommended,
      title,
      amount,
    },
  };

  try {
    const result = await Product.findOneAndUpdate(
      { date, productId, owner },
      updateData,
      { new: true, upsert: true }
    );
    console.log('result', result);

    if (!result) {
      const newDiaryProduct = await Product.create({ ...req.body, owner });
      console.log('!result', newDiaryProduct);

      res.status(201).json(newDiaryProduct);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, date } = req.query;
  const skip = (page - 1) * limit;
  const filter = { date, owner };

  const products = await Product.find(filter).skip(skip).limit(limit);

  console.log(products);

  if (!products) {
    throw HttpError(204, 'There are no entries in the diary for this date');
  }
  res.json(products);
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  // const validationResult = schemasDelProduct.delProductSchemaJoi.validate({
  //   date,
  //   productId,
  // });

  // if (validationResult.error) {
  //   return res
  //     .status(400)
  //     .json({ error: validationResult.error.details[0].message });
  // }
  // if (!date || !productId) {
  //   throw HttpError(400, 'Missing required fields');
  // }
  // const filter = { date, owner };

  const product = await delProduct.findByIdAndDelete(productId);
  if (!product) {
    console.log("product doesn't exist");
    throw HttpError(404, 'Not found');
  }
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
