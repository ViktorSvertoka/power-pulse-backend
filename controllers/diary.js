const { diaryExercise } = require('../models/diaryExercise');
const { ctrlWrapper, HttpError } = require('../helpers');
const { Diary } = require('../models/diary');

const getDiary = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query;
  if (Object.keys(req.query).length < 1) {
    throw HttpError(404, 'Not Found, enter the date!');
  }
  const filter = { date, owner };

  const user = await Diary.findOne(filter);
  console.log(user);
  if (!user) {
    console.log('!user');
    throw HttpError(204, 'There are no entries in the diary for this date');
  }

  const burnedCalories = user.exercises
    .map(item => item.burnedCalories)
    .reduce((previousValue, burnedCalories) => {
      return previousValue + burnedCalories;
    }, 0);
  const consumedCalories = user.products
    .map(item => item.calories)
    .reduce((previousValue, consumedCalories) => {
      return previousValue + consumedCalories;
    }, 0);
  const doneExercisesTime = user.exercises
    .map(item => item.time)
    .reduce((previousValue, exerciseTime) => {
      return previousValue + exerciseTime;
    }, 0);

  const updatedData = {
    _id: user._id,
    date: user.date,
    owner: user.owner,
    burnedCalories,
    consumedCalories,
    doneExercisesTime,
    products: [...user.products],
    exercises: [...user.exercises],
  };

  res.json(updatedData);
};

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

  const newProduct = {
    calories,
    category,
    recommended,
    title,
    amount,
    weight,
    productId,
  };

  const oldResult = await Diary.findOne({ date, owner });

  if (!oldResult) {
    console.log('oldResult.length === 0');
    const newDiaryProduct = await Diary.create({
      owner,
      date,
      products: [newProduct],
    });
    res.status(201).json(newDiaryProduct);
  } else {
    console.log('oldResult.length !== 0');
    const calories = oldResult.products
      .map(item => item.calories)
      .reduce((previousValue, calories) => {
        return previousValue + calories;
      }, 0);

    const amount = oldResult.products
      .map(item => item.amount)
      .reduce((previousValue, amount) => {
        return previousValue + amount;
      }, 0);
    const weight = oldResult.products
      .map(item => item.weight)
      .reduce((previousValue, weight) => {
        return previousValue + weight;
      }, 0);

    const updateData = {
      calories,
      category,
      recommended,
      title,
      amount,
      weight,
      productId,
    };

    const result = await Diary.findOneAndUpdate(
      { owner, date },
      { $push: { products: updateData } },
      { new: true }
    );
    console.log(result);
    res.status(200).json(result);
  }
};

const addExercise = async (req, res) => {
  const { _id: owner } = req.user;
  const {
    date,
    bodyPart,
    target,
    time,
    exerciseId,
    equipment,
    name,
    burnedCalories,
  } = req.body;

  console.log(req.body);

  const newExercise = {
    bodyPart,
    target,
    time,
    exerciseId,
    equipment,
    name,
    burnedCalories,
  };

  const filter = { date, owner };
  console.log(filter);

  try {
    const oldResult = await Diary.findOne(filter);

    if (!oldResult) {
      console.log('No existing diary entry for this date. Creating a new one.');
      const newDiaryExercise = await Diary.create({
        owner,
        date,
        exercises: [newExercise],
        products: [], // Add an empty products array if needed
      });
      return res.status(201).json(newDiaryExercise);
    }

    console.log('Existing diary entry found. Updating.');

    oldResult.exercises = oldResult.exercises || [];
    oldResult.exercises.push(newExercise);

    const burnedCaloriesSum = oldResult.exercises.reduce(
      (sum, exercise) => sum + exercise.burnedCalories,
      0
    );
    const timeSum = oldResult.exercises.reduce(
      (sum, exercise) => sum + exercise.time,
      0
    );

    oldResult.burnedCalories = burnedCaloriesSum;
    oldResult.time = timeSum;

    const result = await oldResult.save();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error adding or updating exercise:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteProduct = async (req, res) => {
  const { id, date } = req.query;
  console.log('req.query', req.query);
  const { _id: owner } = req.user;

  const filter = { owner: owner, date: date };
  console.log(filter);

  const user = await Diary.findOne(filter);

  if (!user) {
    throw HttpError(404, 'User not found :(');
  }

  console.log(user);

  const product = user.products.find(product => product._id.toString() === id);

  if (!product) {
    throw HttpError(404, 'Product not found :(');
  }

  await Diary.findOneAndUpdate(
    filter,
    { $pull: { products: { _id: product._id } } },
    { new: true }
  );

  res.status(200).json({ message: 'Product deleted' });
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
  const { id, date } = req.query;
  console.log('req.query', req.query);
  const { _id: owner } = req.user;

  const filter = { owner: owner, date: date };
  console.log(filter);

  const user = await Diary.findOne(filter);
  console.log('user', user);

  if (!user) {
    throw HttpError(404, 'User not found :(');
  }

  const exercise = user.exercises.find(
    exercise => exercise._id.toString() === id
  );

  if (!exercise) {
    throw HttpError(404, 'Exercise not found :(');
  }

  await Diary.findOneAndUpdate(
    filter,
    { $pull: { exercises: { _id: exercise._id } } },
    { new: true }
  );

  res.status(200).json({ message: 'Product deleted' });
};

module.exports = {
  addProduct: ctrlWrapper(addProduct),
  deleteProduct: ctrlWrapper(deleteProduct),
  addExercise: ctrlWrapper(addExercise),
  deleteExercise: ctrlWrapper(deleteExercise),
  getDiary: ctrlWrapper(getDiary),
  getExercise: ctrlWrapper(getExercise),
};
