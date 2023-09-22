const { Diary } = require('../../models/diary');
const { HttpError, ctrlWrapper } = require('../../helpers');

const deleteExercise = async (req, res) => {
  const { _id: owner } = req.user;
  const { date, exerciseId } = req.query;

  if (!date || !exerciseId) {
    throw HttpError(400, 'Please provide both date and exerciseId');
  }

  const filter = { date, owner };

  const diaryEntry = await Diary.findOne(filter);

  if (!diaryEntry) {
    throw HttpError(404, 'Not Found');
  }
  console.log('ENTRY', diaryEntry.exercises);

  const exercise = diaryEntry.exercises.find(
    exercise => exercise._id.toString() === exerciseId
  );
  console.log(exercise);

  if (!exercise) {
    throw HttpError(404, 'Exercise not found');
  }

  await Diary.findOneAndUpdate(filter, {
    $pull: { exercises: { _id: exerciseId } },
  });

  res.status(200).json({ message: 'Exercise deleted successfully' });
};
module.exports = ctrlWrapper(deleteExercise);
