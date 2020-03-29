const Logger = require('../loaders/logger');
const authService = require('../services/auth');

exports.signup = async (req, res, next) => {
  try {
    const user = await authService.signup(req.body);

    return res.json({ success: true, user }).status(200);
  } catch (error) {
    Logger.error('🔥 error: %o', error.message);
    return next(error);
  }
};
