const { ctrlWrapper } = require('../helpers');

const { User } = require('../models/user');
// const { UserData } = require('../models/userData');

// const addUserData = async (req, res) => {
//   const { _id: owner } = req.user;

//   const userData = {
//     ...req.body,
//   };

//     const addData = await User.findOneAndUpdate(
//         ...userData, owner);

//   res.status(200).json({ addData });
// };

const addUserData = async (req, res) => {
  // const { _id: owner } = req.user;

  // const userData = {
  //   ...req.body,
  // };

  try {
    const { email } = req.user;
    const updatedData = await User.findOneAndUpdate(
      email,
      req.body,
      // { owner: owner },
      // {userData},
      { new: true }
    );
    console.log(updatedData);

    if (updatedData) {
      res.status(200).json(updatedData);
    } else {
      res.status(404).json({ message: 'Користувача не знайдено' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

module.exports = {
  addUserData: ctrlWrapper(addUserData),
};
