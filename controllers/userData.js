const { ctrlWrapper } = require('../helpers');

const { User} = require('../models/user');

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
    const { _id } = req.params;
    const updatedData = await User.findOneAndUpdate( _id, req.body,
      // { owner: owner }, 
      // {userData},
      { new: true } 
    );

    if (updatedData) {
      res.status(200).json( updatedData );
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
