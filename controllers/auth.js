const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const gravatar = require('gravatar');

const { nanoid } = require('nanoid');

const { User } = require('../models/user');

const {
  sendEmail,
  ctrlWrapper,
  HttpError,
  generateVerifyMessage,
  calculateBMR,
} = require('../helpers');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  // const verificationToken = nanoid();

  // const verifyEmail = {
  //   to: email,
  //   subject: 'Verify your email',
  //   html: generateVerifyMessage(verificationToken),
  // };

  // await sendEmail(verifyEmail);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    // verificationToken,
  });

  const payload = { id: newUser._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
    token: token, // Додаємо токен у відповідь
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, 'User not found');
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({
    message: 'Verification successful',
  });
};

const repeatEmailVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify your email',
    html: generateVerifyMessage(user.verificationToken),
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    message: 'Verification email sent',
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  // if (!user.verify) {
  //   throw HttpError(401, 'Email not verified');
  // }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token: token,
    user: {
      name: user.name,
      email: user.email,
      avatar: user.avatarURL,
    },
  });
};

const current = async (req, res) => {
  const { name, email, avatarURL } = req.user;

  res.status(200).json({
    name,
    email,
    avatarURL,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, { token: '' });

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(204).json({ message: 'logout was successfull' });
};

const updateAvatar = async (req, res) => {
  const avatarURL = req.file.path;

  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

const addUserData = async (req, res) => {
  try {
    const { email } = req.user;
    const updatedData = await User.findOneAndUpdate({ email }, req.body, {
      new: true,
    });
    console.log(updatedData);
    const { desiredWeight, height, birthday, sex, levelActivity } = updatedData;

    const bmr = calculateBMR(
      desiredWeight,
      height,
      birthday,
      sex,
      levelActivity
    );

    updatedData.bmr = bmr;

    await updatedData.save();

    if (updatedData) {
      res.status(201).json(updatedData);
    } else {
      res.status(404).json({ message: 'Користувача не знайдено' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

const getUserParams = async (req, res, next) => {
  try {
    const { email } = req.user;
    const result = await User.findOne({ email });
    if (!result) {
      HttpError(404, 'Not found');
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),

  verifyEmail: ctrlWrapper(verifyEmail),
  repeatEmailVerify: ctrlWrapper(repeatEmailVerify),
  addUserData: ctrlWrapper(addUserData),
  getUserParams: ctrlWrapper(getUserParams),
};
