const { ctrlWrapper, HttpError } = require('../helpers');

const ExerciseName = require('../models/exercisesName');
const BodyPartsSchema = require('../models/bodyParts');
const Muscules = require('../models/muscules');
const Equipments = require('../models/equipments');

const getAllExercisesName = async (req, res) => {
  const result = await ExerciseName.find({
    name: 'assisted hanging knee raise with throw down',
  });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const getAllBodyParts = async (req, res) => {
  const result = await BodyPartsSchema.find({ filter: 'Body parts' });

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const getAllMuscules = async (req, res) => {
  const result = await Muscules.find({ filter: 'Muscles' });

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const getAllEquipments = async (req, res) => {
  const result = await Equipments.find({ filter: 'Equipment' });

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

module.exports = {
  getAllExercisesName: ctrlWrapper(getAllExercisesName),
  getAllBodyParts: ctrlWrapper(getAllBodyParts),
  getAllMuscules: ctrlWrapper(getAllMuscules),
  getAllEquipments: ctrlWrapper(getAllEquipments),
};
