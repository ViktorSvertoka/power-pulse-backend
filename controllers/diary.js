const { Product, schemasProduct } = require('../models/diaryProduct');
const { diaryExercise } = require('../models/diaryExercise');
const { ctrlWrapper, HttpError } = require('../helpers');

const addProduct = async (req, res) => {
	const {_id: owner} = req.user;
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
				calories: calories + oldResult[0]["calories"],
				category,
				recommended,
				title,
				amount: amount + oldResult[0]["amount"],
				weight: weight + oldResult[0]["weight"],
			},
		}; 	
		const result = await Product.findOneAndUpdate(
			{ date, productId, owner },
			updateData,
			{ new: true }
		);	 
			res.status(200).json(result);
	};
};

const getProduct = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query;
  const filter = { date, owner};
  const products = await Product.find(filter);
  if (!products) {
    throw HttpError(204, 'There are no entries in the diary for this date');
  }
  res.json(products);
};

const deleteProduct = async (req, res) => {
  const { productId, date } = req.body;
  const { _id: owner } = req.user;
  const product = await Product.findOneAndDelete({
    productId,
    date,
    owner,
  });
  if (!product) {
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
