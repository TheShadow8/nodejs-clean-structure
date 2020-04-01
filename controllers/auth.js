const Logger = require('../loaders/logger');
const authService = require('../services/auth');

exports.signup = async (req, res, next) => {
  try {
    const user = await authService.signup(req.body);

    return res.status(200).json({ success: true, user });
  } catch (error) {
    Logger.error('🔥 error: %o', error.message);
    return next(error);
  }
};
