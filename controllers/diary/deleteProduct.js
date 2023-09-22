const { Diary } = require('../../models/diary');
const { HttpError, ctrlWrapper } = require('../../helpers');

const deleteProduct = async (req, res) => {
  const { _id: owner } = req.user;
  const { date, productId } = req.query;

  if (!date || !productId) {
    throw HttpError(400, 'Please provide both date and productId');
  }

  const filter = { date, owner };

  const diaryEntry = await Diary.findOne(filter);

  if (!diaryEntry) {
    throw HttpError(404, 'Diary entry not found');
  }

  const productIndex = diaryEntry.products.findIndex(
    product => product._id.toString() === productId
  );

  if (productIndex === -1) {
    throw HttpError(404, 'Продукт не найден');
  }

  diaryEntry.products.splice(productIndex, 1);
  await diaryEntry.save();

  res.status(200).json({ message: 'Product deleted successfully' });
};

module.exports = ctrlWrapper(deleteProduct);
