const validator = require('validator');

const User = require('../models/User');

exports.signup = async ({ email, password, passwordConfirmation }) => {
  if (!password || !email || !passwordConfirmation) {
    throw new Error('All fields are required');
  }

  if (!validator.isEmail(email)) {
    throw new Error('Invalid Email');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  if (password !== passwordConfirmation) {
    throw new Error('Password is not a same as confirmation');
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('User already existed');
  }

  const user = new User({
    email,
    password
  });

  await user.save();

  return user;
};
